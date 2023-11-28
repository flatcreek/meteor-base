import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

import updateUser from './actions/updateUser';
import removeUser from './actions/removeUser';
import sendWelcomeEmail from './actions/sendWelcomeEmail';

Meteor.methods({
  updateUser,
  removeUser,
  sendVerificationEmail: (args) => {
    check(args, {
      userId: String,
    });

    const { userId } = args;
    if (userId && !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Error('You must be an administrator to perform this action.');
    }
    const thisUserId = userId || Meteor.userId();
    Accounts.sendVerificationEmail(thisUserId);
    return {
      _id: thisUserId,
    };
  },
  sendWelcomeEmail,
});
