import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

import { isAdmin } from '../actions/checkIfAuthorized';

Meteor.publish('users', function () {
  if (Meteor.isDevelopment) {
    console.log('queryUsers starting');
  }
  if (!this.userId) {
    throw new Error('Must be logged in!');
  }
  if (!isAdmin(this.userId)) {
    throw new Error('You do not have permission to do this.');
  }
  return Meteor.users.find();
});
