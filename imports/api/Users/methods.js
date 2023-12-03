import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

import exportUserData from './actions/exportUserData';
import getUserCount from './actions/getUserCount';
import removeUser from './actions/removeUser';
import sendWelcomeEmail from './actions/sendWelcomeEmail';
import updateUser from './actions/updateUser';

Meteor.methods({
  exportUserData,
  getUserCount,
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
  updateUser,
});
