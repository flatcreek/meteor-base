import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Documents } from '../Documents';

const removeDocument = (args) => {
  if (Meteor.isDevelopment) {
    console.log('removeDocument starting');
    console.log(args);
  }

  check(args, {
    documentId: String,
  });

  try {
    if (!Meteor.userId()) {
      throw new Error('Sorry, you must be logged in to remove a document.');
    }

    const { documentId } = args || {};

    if (!Documents.findOne({ _id: documentId, createdBy: Meteor.userId() })) {
      throw new Error('Sorry, you need to be the owner of this document to remove it.');
    }

    Documents.remove({ _id: documentId });

    return true;
  } catch (error) {
    console.warn('[removeDocument] error:');
    console.warn(error);
    throw new Meteor.Error(500, `[removeDocument] ${error.message}`);
  }
};

export default removeDocument;
