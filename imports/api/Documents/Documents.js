/* eslint-disable consistent-return */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Documents = new Mongo.Collection('Documents');

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = new SimpleSchema({
  title: {
    label: 'Title',
    type: String,
  },
  isPublic: {
    label: 'isPublic',
    type: Boolean,
  },
  body: {
    label: 'Body',
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
  updatedAt: {
    type: Date,
    label: 'Updated At',
    optional: true,
    autoValue() {
      if (this.isInsert) {
        this.unset();
      } else {
        return new Date();
      }
    },
  },
});

Documents.attachSchema(Documents.schema);
