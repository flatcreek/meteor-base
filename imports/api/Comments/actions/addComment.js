import { Meteor } from 'meteor/meteor';
import sanitizeHtml from 'sanitize-html';

import { Comments } from '../Comments';

const addComment = (args) => {
  if (!Meteor.userId()) throw new Error('Sorry, you must be logged in to add a new comment.');

  const date = new Date().toISOString();
  const commentToInsert = {
    documentId: args.documentId,
    comment: sanitizeHtml(args.comment),
    userId: Meteor.userId(),
    createdAt: date,
  };

  const commentId = Comments.insert(commentToInsert);
  return { _id: commentId, ...commentToInsert };
};

export default addComment;
