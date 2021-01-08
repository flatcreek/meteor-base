import queryDocument from './actions/queryDocument';
import queryDocuments from './actions/queryDocuments';

export default {
  documents: (parent, args, context) => {
    return queryDocuments(parent, args, context);
  },
  document: (parent, args, context) => {
    return queryDocument(parent, args, context);
  },
};
