/* eslint-disable consistent-return */
import { Meteor } from 'meteor/meteor';
import Documents from '../../Documents/Documents';
import checkIfAuthorized, { isAdmin } from './checkIfAuthorized';

const deleteUser = ({ _id }) => {
  try {
    return Meteor.users.remove(_id);
  } catch (error) {
    throw new Error(`[removeUser.deleteUser] ${error.message}`);
  }
};

const deleteDocuments = ({ _id }) => {
  try {
    return Documents.remove({ createdBy: _id });
  } catch (error) {
    throw new Error(`[removeUser.deleteDocuments] ${error.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.currentUser) throw new Error('options.currentUser is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (error) {
    throw new Error(`[removeUser.validateOptions] ${error.message}`);
  }
};

const removeUser = (options) => {
  try {
    validateOptions(options);
    checkIfAuthorized({
      as: ['admin', () => !options.user._id],
      userId: options.currentUser._id,
      errorMessage: 'Sorry, you need to be an admin or the passed user to do this.',
    });

    const userToRemove = options.user;

    if (!userToRemove._id) {
      userToRemove._id = options.currentUser._id;
    }

    if (userToRemove && !userToRemove._id && !isAdmin(options.currentUser._id)) {
      // NOTE: If passed user doesn't have an _id, we know we're updating the
      // currently logged in user (i.e., via the /profile page).
      userToRemove._id = options.currentUser._id;
    }

    deleteDocuments(userToRemove);
    deleteUser(userToRemove);
    return true;
  } catch (error) {
    throw new Meteor.Error(500, `[removeUser] ${error.message}`);
  }
};

export default removeUser;
