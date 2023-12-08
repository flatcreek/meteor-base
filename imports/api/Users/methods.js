import { Meteor } from 'meteor/meteor';

import exportUserData from './actions/exportUserData';
import getUserCount from './actions/getUserCount';
import removeUser from './actions/removeUser';
import sendVerificationEmail from './actions/sendVerificationEmail';
import sendWelcomeEmail from './actions/sendWelcomeEmail';
import updateUser from './actions/updateUser';

Meteor.methods({
  exportUserData,
  getUserCount,
  removeUser,
  sendVerificationEmail,
  sendWelcomeEmail,
  updateUser,
});
