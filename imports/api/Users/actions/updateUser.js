import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { isAdmin } from './checkIfAuthorized';

import queryUser from './queryUser';

// Deny all client-side updates to user documents.
// Fixes meteor 'profile' vulnerability.
Meteor.users.deny({
  update() {
    return true;
  },
});

const updateUserProfile = ({ _id, profile }) => {
  try {
    return Meteor.users.update(_id, {
      $set: { profile },
    });
  } catch (error) {
    throw new Error(`[updateUser.updateUserProfile] ${error.message}`);
  }
};

const updateUserEmail = ({ _id, email }) => {
  try {
    return Meteor.users.update(_id, {
      $set: {
        'emails.0.address': email,
      },
    });
  } catch (error) {
    throw new Error(`[updateUserEmail] ${error.message}`);
  }
};

const updateUserRoles = async ({ _id, roles }) => {
  try {
    return Roles.setUserRoles(_id, roles, Roles.GLOBAL_GROUP);
  } catch (error) {
    console.warn('updateUserRoles error:');
    console.warn(error);
    throw new Error(`[updateUserRoles] ${error.message}`);
  }
};

const updateUserPassword = ({ _id, password }) => {
  try {
    return Accounts.setPassword(_id, password);
  } catch (error) {
    throw new Error(`[updateUserPassword] ${error.message}`);
  }
};

const validateOptions = (options) => {
  try {
    check(options, Object);
    if (!Meteor.userId()) {
      throw new Error('You must be logged in to perform this action.');
    }
    // If there is a userId present, but this is not an admin, throw an error
    if (options._id && !isAdmin(Meteor.userId())) {
      throw new Error('Sorry, you need to be an admin or the current user to do this.');
    }
  } catch (error) {
    throw new Error(`[validateOptions] ${error.message}`);
  }
};

const updateUser = (args) => {
  if (Meteor.isDevelopment) {
    console.log('updateUser starting');
    console.log(args);
  }
  try {
    validateOptions(args);
    // eslint-disable-next-line prefer-const
    let user = args;

    if (user && !user._id) {
      // NOTE: If passed user doesn't have an _id, we know we're updating the
      // currently logged in user (i.e., via the /profile page).
      user._id = Meteor.userId();
    }

    if (user.password) {
      updateUserPassword(user);
    }
    if (user.roles && isAdmin(Meteor.userId())) {
      updateUserRoles(user).catch((e) => console.warn(e));
    }
    if (user.email) {
      updateUserEmail(user);
    }
    if (user.profile) {
      updateUserProfile(user);
    }

    return queryUser({ userIdToQuery: user._id });
  } catch (error) {
    console.warn('[updateUser] error:');
    console.warn(error);
    throw new Meteor.Error(500, `[updateUser] ${error.message}`);
  }
};

export default updateUser;
