import sanitizeHtml from 'sanitize-html';
import Documents from '../Documents';

const addDocument = async (_, args, context) => {
  try {
    if (!context.user) throw new Error('Sorry, you must be logged in to add a new document.');
    const date = new Date().toISOString();
    const documentId = Documents.insert({
      isPublic: args.isPublic || false,
      title:
        args.title ||
        `Untitled Document #${Documents.find({ owner: context.user._id }).count() + 1}`,
      body: args.body
        ? sanitizeHtml(args.body)
        : 'This is my document. There are many like it, but this one is mine.',
      owner: context.user._id,
      createdAt: date,
      updatedAt: date,
    });
    const doc = Documents.findOne(documentId);
    return doc;
  } catch (exception) {
    console.warn('[addDocument] error:');
    console.warn(exception);
    throw new Error(`[addDocument] ${exception.message}`);
  }
};

export default addDocument;
