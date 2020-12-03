import sanitizeHtml from 'sanitize-html';
import Documents from '../Documents';

const addDocument = (_, args, context) => {
  if (!context.user) throw new Error('Sorry, you must be logged in to update a document.');
  if (!Documents.findOne({ _id: args._id, owner: context.user._id }))
    throw new Error('Sorry, you need to be the owner of this document to update it.');
  Documents.update(
    { _id: args._id },
    {
      $set: {
        ...args,
        body: sanitizeHtml(args.body),
        updatedAt: new Date().toISOString(),
      },
    },
  );
  const doc = Documents.findOne(args._id);
  return doc;
};

export default addDocument;
