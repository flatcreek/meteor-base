import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check, Match } from 'meteor/check';

import { Documents } from '../Documents';

Meteor.publish('document', function (args) {
  if (Meteor.isDevelopment) {
    console.log('queryDocument starting');
    console.log(args);
  }

  check(args, {
    documentId: String,
    isEdit: Match.Maybe(Boolean),
  });

  const { documentId, isEdit } = args || {};

  if (!documentId) {
    throw new Error('Must provide a document ID');
  }
  const { userId } = this;

  // If the user is not logged in, only return public documents
  // Note: by placing this condition first, we know that all following
  // conditions will be for a logged in user.
  if (!userId) {
    return Documents.find({ _id: documentId, isPublic: true });
  }

  // If the user is an admin, always return the document
  if (Roles.userIsInRole(userId, 'admin')) {
    return Documents.find({ _id: documentId });
  }

  // If the user is fetching this document to edit it, only return if the
  // current user is the document owner.
  if (isEdit) {
    return Documents.find({ _id: documentId, createdBy: userId });
  }

  return Documents.find({ _id: documentId });

  // If the user is logged in, return the document if it is public or the user owns it
  // return Documents.findOne({
  //   $or: [{ _id: documentId, createdBy: userId }, { _id: documentId, isPublic: true }],
  // });
});

Meteor.publish('documents', function () {
  if (Meteor.isDevelopment) {
    console.log('queryDocuments starting');
  }
  if (!this.userId) {
    throw new Error('Must be logged in!');
  }
  return Documents.find();
});
