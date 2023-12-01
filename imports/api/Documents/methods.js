import { Meteor } from 'meteor/meteor';

import addDocument from './actions/addDocument';
import removeDocument from './actions/removeDocument';
import updateDocument from './actions/updateDocument';

Meteor.methods({
  addDocument,
  removeDocument,
  updateDocument,
});
