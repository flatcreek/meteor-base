import { Meteor } from 'meteor/meteor';

import { Documents } from '../Documents';

const removeDocument = (args) => {
  if (!Meteor.userId()) {
    throw new Error('Sorry, you must be logged in to remove a document.');
  }

  const { documentId } = args || {};

  if (!Documents.findOne({ _id: documentId, owner: Meteor.userId() })) {
    throw new Error('Sorry, you need to be the owner of this document to remove it.');
  }

  Documents.remove({ _id: documentId });

  return true;
};

export default removeDocument;
