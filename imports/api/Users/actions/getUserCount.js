import { Meteor } from 'meteor/meteor';

const getUserCount = async () => {
  try {
    if (!Meteor.userId) {
      throw new Error('You must be logged in to do this.');
    }
    return Meteor.users.find().count();
  } catch (error) {
    throw new Meteor.Error(500, `[queryUser] ${error.message}`);
  }
};

export default getUserCount;
