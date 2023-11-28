import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import mapMeteorUserToSchema from './mapMeteorUserToSchema';

const getTotalUserCount = (currentUserId) => {
  try {
    return Meteor.users.find({ _id: { $ne: currentUserId } }).count();
  } catch (error) {
    throw new Error(`[getTotalUserCount] ${error.message}`);
  }
};

const getQuery = (options) => {
  try {
    return options.search
      ? {
          _id: { $ne: options.currentUser._id },
          $or: [
            { 'profile.name.first': options.search },
            { 'profile.name.last': options.search },
            { 'emails.address': options.search },
            { 'services.facebook.first_name': options.search },
            { 'services.facebook.last_name': options.search },
            { 'services.facebook.email': options.search },
            { 'services.google.name': options.search },
            { 'services.google.email': options.search },
            { 'services.github.email': options.search },
            { 'services.github.username': options.search },
          ],
        }
      : { _id: { $ne: options.currentUser._id } };
  } catch (error) {
    throw new Error(`[getQuery] ${error.message}`);
  }
};

const getProjection = (options) => {
  try {
    return options.search
      ? { sort: options.sort }
      : { limit: options.limit, skip: options.skip, sort: options.sort };
  } catch (error) {
    throw new Error(`[getProjection] ${error.message}`);
  }
};

const getUsers = (options) => {
  try {
    const query = getQuery(options);
    const projection = getProjection(options);
    return Meteor.users
      .find(query, projection)
      .fetch()
      .map((user) => mapMeteorUserToSchema({ user }));
  } catch (error) {
    throw new Error(`[getUsers] ${error.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.currentUser) throw new Error('options.currentUser is required.');
    if (!Roles.userIsInRole(options.currentUser._id, 'admin')) {
      throw new Error('You must be an administrator to perform this action.');
    }
  } catch (error) {
    throw new Error(`[validateOptions] ${error.message}`);
  }
};

const queryUsers = (options) => {
  try {
    validateOptions(options);

    return {
      total: () => getTotalUserCount(options.currentUser._id),
      users: () => getUsers(options),
    };
  } catch (error) {
    console.warn('[queryUsers] error:');
    console.warn(error);
    throw new Error(`[queryUsers] ${error.message}`);
  }
};

export default queryUsers;
