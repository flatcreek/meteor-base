/* eslint-disable consistent-return, import/prefer-default-export */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Comments = new Mongo.Collection('Comments');

Comments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Comments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Comments.schema = new SimpleSchema({
  documentId: {
    label: 'Document ID',
    type: String,
  },
  comment: {
    label: 'Comment',
    type: String,
  },
  createdBy: {
    type: String,
    label: 'Created By',
    optional: true,
    autoValue() {
      if (this.isSet && this.isFromTrustedCode) {
        return this.value;
      }
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
    },
    denyUpdate: true,
  },
});

Comments.attachSchema(Comments.schema);
