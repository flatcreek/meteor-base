import { Meteor } from 'meteor/meteor';

import { Comments } from '../Comments';

Meteor.publish('comments', function (args) {
  const { documentId, sortBy } = args || {};

  return Comments.find(
    { documentId },
    { sort: { createdAt: sortBy === 'newestFirst' ? -1 : 1 } },
  );
});
