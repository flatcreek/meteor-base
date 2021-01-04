import { Meteor } from 'meteor/meteor';
import Documents from '../Documents';

const queryDocument = (parent, args, context) => {
  if (Meteor.isDevelopment) {
    console.log('queryDocuments starting');
    console.log(args);
  }
  try {
    if (!context.user && context.user._id) {
      throw new Error('Must be logged in!');
    }
    const docs = Documents.find().fetch();
    return docs || [];
  } catch (error) {
    console.warn('[queryDocuments] error');
    console.warn(error);
    throw new Error(`[Documents] ${error.message}`);
  }
};

export default queryDocument;
