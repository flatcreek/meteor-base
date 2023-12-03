import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { isAdmin } from '../actions/checkIfAuthorized';

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
  const { limit, skip, sort } = args || {};
  return Meteor.users.find({}, { limit, skip, sort });
});
