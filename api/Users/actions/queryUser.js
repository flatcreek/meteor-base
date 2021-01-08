import { Meteor } from 'meteor/meteor';
import mapMeteorUserToSchema from './mapMeteorUserToSchema';

const getUser = (userId) => {
  try {
    return Meteor.users.findOne(userId);
  } catch (exception) {
    throw new Error(exception);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.userIdToQuery) throw new Error('options.userIdToQuery is required.');
  } catch (exception) {
    throw new Error(exception);
  }
};

const queryUser = async (options) => {
  try {
    validateOptions(options);
    const user = getUser(options.userIdToQuery);
    return mapMeteorUserToSchema({ user });
  } catch (exception) {
    throw new Error(`[queryUser] ${exception.message}`);
  }
};

export default queryUser;
