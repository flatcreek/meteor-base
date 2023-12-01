import { Meteor } from 'meteor/meteor';

import { Comments } from '../Comments';
import { isAdmin } from '../../Users/actions/checkIfAuthorized';

const removeComment = (args) => {
  if (!Meteor.userId()) {
    throw new Error('Sorry, you must be logged in to remove a comment.');
  }

  const comment = Comments.findOne({ _id: args._id }, { fields: { userId: 1 } });

  if (!isAdmin(Meteor.userId()) || comment.userId !== Meteor.userId()) {
    throw new Error('Sorry, you must be logged in to remove a comment.');
  }

  Comments.remove(args._id);

  return { _id: args._id };
};

export default removeComment;
