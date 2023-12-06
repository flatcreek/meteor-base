import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { isAdmin } from '../actions/checkIfAuthorized';

const getQuery = (search) => {
  return search
    ? {
        $or: [
          { 'profile.firstName': search },
          { 'profile.lastName': search },
          { 'emails.address': search },
        ],
      }
    : {};
};

Meteor.publish('user', function (args) {
  if (Meteor.isDevelopment) {
    console.log('queryUser starting');
    console.log(args);
  }
  check(args, {
    userId: Match.Maybe(String),
  });
  if (!this.userId) {
    this.error('You must be logged in to do this.');
  }
  const { userId } = args || {};

  return Meteor.users.find({ _id: userId });
});

Meteor.publish('users', function (args) {
  if (Meteor.isDevelopment) {
    console.log('queryUsers starting');
    console.log(args);
  }
  check(args, {
    sort: Match.Maybe(String),
    limit: Number,
    skip: Number,
    search: Match.Maybe(String),
  });
  if (!this.userId) {
    this.error('Must be logged in!');
  }
  if (!isAdmin(this.userId)) {
    this.error('You must be logged in to do this.');
  }
  const { limit, search, skip, sort } = args || {};
  const query = getQuery(new RegExp(search, 'i'));
  return Meteor.users.find(query, { limit, skip, sort });
});
