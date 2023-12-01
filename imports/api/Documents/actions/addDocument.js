import { Meteor } from 'meteor/meteor';
import sanitizeHtml from 'sanitize-html';

import { Documents } from '../Documents';

const addDocument = async (args) => {
  if (Meteor.isDevelopment) {
    console.log('addDocument starting');
    console.log(args);
  }

  try {
    if (!Meteor.userId()) {
      throw new Error('Sorry, you must be logged in to add a new document.');
    }
    const documentId = Documents.insert({
      isPublic: args?.isPublic || false,
      title:
        args?.title ||
        `Untitled Document #${Documents.find({ createdBy: Meteor.userId() }).count() + 1}`,
      body: args?.body
        ? sanitizeHtml(args.body)
        : 'This is my document. There are many like it, but this one is mine.',
    });
    return documentId;
  } catch (error) {
    console.warn('[addDocument] error:');
    console.warn(error);
    throw new Meteor.Error(500, `[addDocument] ${error.message}`);
  }
};

export default addDocument;
