import sanitizeHtml from 'sanitize-html';
import removeNullValuesFromObj from '../../../modules/utils';
import Documents from '../Documents';

const validateOptions = (args, context) => {
  // Validate that the mutation is being called by a logged in user
  if (!context.user) throw new Error('Sorry, you must be logged in to update a document.');

  // Validate that the mutation is being called by this document's owner
  const thisDocument = Documents.findOne({ _id: args._id, owner: context.user._id });
  if (!thisDocument) {
    throw new Error('Sorry, you need to be the owner of this document to update it.');
  }
};

const updateDocument = (_, args, context) => {
  try {
    validateOptions(args, context);
    const updatedBody = args.body ? sanitizeHtml(args.body) : null;
    const updateObj = removeNullValuesFromObj({
      ...args,
      body: updatedBody,
      updatedAt: new Date().toISOString(),
    });

    Documents.update(
      { _id: args._id },
      {
        $set: {
          ...updateObj,
        },
      },
    );
    const doc = Documents.findOne(args._id);
    return doc;
  } catch (exception) {
    console.warn('[updateDocument] error:');
    console.warn(exception);
    throw new Error(`[updateDocument] ${exception.message}`);
  }
};

export default updateDocument;
