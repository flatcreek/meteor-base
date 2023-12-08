/* eslint-disable import/prefer-default-export */
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Schema = {};

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  aboutMe: {
    type: String,
    optional: true,
  },
  profilePic: {
    type: String,
    optional: true,
  },
});

Schema.User = new SimpleSchema({
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': Object,
  'emails.$.address': {
    label: 'Email address',
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  createdAt: Date,
  profile: {
    type: Schema.UserProfile,
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  heartbeat: {
    type: Date,
    optional: true,
  },
});

Meteor.users.attachSchema(Schema.User);
