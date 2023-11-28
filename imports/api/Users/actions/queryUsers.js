import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import mapMeteorUserToSchema from './mapMeteorUserToSchema';

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.currentUser) throw new Error('options.currentUser is required.');
    if (!Roles.userIsInRole(options.currentUser._id, 'admin')) {
      throw new Error('You must be an administrator to perform this action.');
    }
  } catch (exception) {
    throw new Error(`[validateOptions] ${exception.message}`);
  }
};

const getTotalUserCount = (currentUserId) => {
  try {
    return Meteor.users.find({ _id: { $ne: currentUserId } }).count();
  } catch (exception) {
    throw new Error(`[getTotalUserCount] ${exception.message}`);
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
  } catch (exception) {
    throw new Error(`[getQuery] ${exception.message}`);
  }
};

const getProjection = (options) => {
  try {
    return options.search
      ? { sort: options.sort }
      : { limit: options.limit, skip: options.skip, sort: options.sort };
  } catch (exception) {
    throw new Error(`[getProjection] ${exception.message}`);
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
  } catch (exception) {
    throw new Error(`[getUsers] ${exception.message}`);
  }
};

const queryUsers = (options) => {
  try {
    validateOptions(options);

    return {
      total: () => getTotalUserCount(options.currentUser._id),
      users: () => getUsers(options),
    };
  } catch (exception) {
    console.warn('[queryUsers] error:');
    console.warn(exception);
    throw new Error(`[queryUsers] ${exception.message}`);
  }
};

export default queryUsers;
