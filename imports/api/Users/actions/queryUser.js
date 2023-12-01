import { Meteor } from 'meteor/meteor';
import mapMeteorUserToSchema from './mapMeteorUserToSchema';

const getUser = (userId) => {
  try {
    return Meteor.users.findOne(userId);
  } catch (error) {
    throw new Error(error);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.userIdToQuery) throw new Error('options.userIdToQuery is required.');
  } catch (error) {
    throw new Error(error);
  }
};

const queryUser = async (options) => {
  try {
    validateOptions(options);
    const user = getUser(options.userIdToQuery);
    return mapMeteorUserToSchema({ user });
  } catch (error) {
    throw new Error(`[queryUser] ${error.message}`);
  }
};

export default queryUser;
