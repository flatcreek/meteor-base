import { Meteor } from 'meteor/meteor';

import addComment from './actions/addComment';
import removeComment from './actions/removeComment';

Meteor.methods({
  addComment,
  removeComment,
});
