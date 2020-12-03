import Documents from '../Documents';

const removeDocument = (_, args, context) => {
  if (!context.user) throw new Error('Sorry, you must be logged in to remove a document.');
  if (!Documents.findOne({ _id: args._id, owner: context.user._id }))
    throw new Error('Sorry, you need to be the owner of this document to remove it.');
  Documents.remove(args);
  return args;
};

export default removeDocument;
