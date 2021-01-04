import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Documents from '../Documents';

const queryDocument = (parent, args, context) => {
  if (Meteor.isDevelopment) {
    console.log('queryDocument starting');
    console.log(args);
  }

  try {
    if (!args._id) {
      throw new Error('Must provide a document ID');
    }
    const userId = context.user && context.user._id;

    // If the user is not logged in, only return public documents
    // Note: by placing this condition first, we know that all following
    // conditions will be for a logged in user.
    if (!userId) {
      return Documents.findOne({ _id: args._id, isPublic: true });
    }

    // If the user is an admin, always return the document
    if (Roles.userIsInRole(userId, 'admin')) {
      return Documents.findOne({ _id: args._id });
    }

    // If the user is fetching this document to edit it, only return if the
    // current user is the document owner.
    if (args.isEdit) {
      return Documents.findOne({ _id: args._id, owner: userId });
    }

    return Documents.findOne({ _id: args._id });

    // If the user is logged in, return the document if it is public or the user owns it
    // return Documents.findOne({
    //   $or: [{ _id: args._id, owner: userId }, { _id: args._id, isPublic: true }],
    // });
  } catch (error) {
    console.warn('[queryDocument] error');
    console.warn(error);
    throw new Error(`[Document] ${error.message}`);
  }
};

export default queryDocument;
