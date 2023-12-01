import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import sanitizeHtml from 'sanitize-html';
import removeNullValuesFromObj from '../../../../modules/utils';
import { Documents } from '../Documents';

const validateOptions = (args) => {
  // Validate that the mutation is being called by a logged in user
  if (!Meteor.userId()) {
    throw new Error('Sorry, you must be logged in to update a document.');
  }

  // Validate that the mutation is being called by this document's owner
  const thisDocument = Documents.findOne({ _id: args.documentId, createdBy: Meteor.userId() });
  if (!thisDocument) {
    throw new Error('Sorry, you need to be the owner of this document to update it.');
  }
};

const updateDocument = (args) => {
  if (Meteor.isDevelopment) {
    console.log('updateDocument starting');
    console.log(args);
  }

  check(args, {
    documentId: String,
    title: Match.Maybe(String),
    body: Match.Maybe(String),
    isPublic: Match.Maybe(Boolean),
  });

  try {
    validateOptions(args);
    const updatedBody = args.body ? sanitizeHtml(args.body) : null;
    const updateObj = removeNullValuesFromObj({
      ...args,
      body: updatedBody,
    });

    Documents.update(
      { _id: args.documentId },
      {
        $set: {
          ...updateObj,
        },
      },
    );
    const doc = Documents.findOne(args.documentId);
    return doc;
  } catch (error) {
    console.warn('[updateDocument] error:');
    console.warn(error);
    throw new Meteor.Error(`[updateDocument] ${error.message}`);
  }
};

export default updateDocument;
