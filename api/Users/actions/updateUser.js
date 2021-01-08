import { Meteor } from 'meteor/meteor';
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

const updateUserSettings = ({ _id, settings }) => {
  try {
    return Meteor.users.update(_id, {
      $set: { settings },
    });
  } catch (exception) {
    throw new Error(`[updateUserSettings] ${exception.message}`);
  }
};

const updateUserProfile = ({ _id, profile }) => {
  try {
    return Meteor.users.update(_id, {
      $set: { profile },
    });
  } catch (exception) {
    throw new Error(`[updateUser.updateUserProfile] ${exception.message}`);
  }
};

const updateUserEmail = ({ _id, email }) => {
  try {
    return Meteor.users.update(_id, {
      $set: {
        'emails.0.address': email,
      },
    });
  } catch (exception) {
    throw new Error(`[updateUserEmail] ${exception.message}`);
  }
};

const updateUserRoles = async ({ _id, roles }) => {
  try {
    return Roles.setUserRoles(_id, roles, Roles.GLOBAL_GROUP);
  } catch (exception) {
    console.warn('updateUserRoles error:');
    console.warn(exception);
    throw new Error(`[updateUserRoles] ${exception.message}`);
  }
};

const updateUserPassword = ({ _id, password }) => {
  try {
    return Accounts.setPassword(_id, password);
  } catch (exception) {
    throw new Error(`[updateUserPassword] ${exception.message}`);
  }
};

const validateOptions = (options, context) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!context.user) throw new Error('You must be logged in to perform this action.');
    if (!options.user) throw new Error('options.user is required.');
    if (!isAdmin(context.user._id) && !(context.user._id === options.user._id)) {
      throw new Error('Sorry, you need to be an admin or the current user to do this.');
    }
  } catch (exception) {
    throw new Error(`[validateOptions] ${exception.message}`);
  }
};

const updateUser = (parent, args, context) => {
  if (Meteor.isDevelopment) {
    console.log('updateUser starting');
    console.log(args.user);
  }
  try {
    validateOptions(args, context);
    // eslint-disable-next-line prefer-const
    let { user } = args;
    const { user: currentUser } = context;

    if (user && !user._id) {
      // NOTE: If passed user doesn't have an _id, we know we're updating the
      // currently logged in user (i.e., via the /profile page).
      user._id = currentUser._id;
    }

    if (user.password) updateUserPassword(user);
    if (user.roles && isAdmin(currentUser._id)) {
      updateUserRoles(user).catch((e) => console.warn(e));
    }
    if (user.email) updateUserEmail(user);
    if (user.profile) updateUserProfile(user);
    if (user.settings) updateUserSettings(user);

    return queryUser({ userIdToQuery: user._id });
  } catch (exception) {
    console.warn('[updateUser] error:');
    console.warn(exception);
    throw new Error(`[updateUser] ${exception.message}`);
  }
};

export default updateUser;
