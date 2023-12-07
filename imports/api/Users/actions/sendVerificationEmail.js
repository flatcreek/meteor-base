import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';

const sendVerificationEmail = (args) => {
  check(
    args,
    Match.Maybe({
      userId: Match.Maybe(String),
    }),
  );

  const { userId } = args || {};
  if (userId && !Roles.userIsInRole(Meteor.userId(), 'admin')) {
    throw new Error('You must be an administrator to perform this action.');
  }
  const thisUserId = userId || Meteor.userId();
  Accounts.sendVerificationEmail(thisUserId);
  return {
    _id: thisUserId,
  };
};

export default sendVerificationEmail;
