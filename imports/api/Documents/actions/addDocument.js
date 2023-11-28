import { Meteor } from 'meteor/meteor';
import sanitizeHtml from 'sanitize-html';

import { Documents } from '../Documents';

const addDocument = async (args) => {
  try {
    if (!Meteor.userId()) {
      throw new Error('Sorry, you must be logged in to add a new document.');
    }
    const date = new Date().toISOString();
    const documentId = Documents.insert({
      isPublic: args.isPublic || false,
      title:
        args.title ||
        `Untitled Document #${Documents.find({ owner: Meteor.userId() }).count() + 1}`,
      body: args.body
        ? sanitizeHtml(args.body)
        : 'This is my document. There are many like it, but this one is mine.',
      owner: Meteor.userId(),
    });
    return true;
  } catch (error) {
    console.warn('[addDocument] error:');
    console.warn(error);
    throw new Error(`[addDocument] ${error.message}`);
  }
};

export default addDocument;
