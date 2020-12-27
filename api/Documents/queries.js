import Documents from './Documents';

export default {
  documents: (parent, args, context) => {
    try {
      if (!context.user && context.user._id) {
        throw new Error('Must be logged in!');
      }
      const docs = Documents.find().fetch();
      return docs || [];
    } catch (error) {
      console.warn('documents error');
      console.warn(error);
      throw new Error(`[Documents] ${error.message}`);
    }
  },
  document: (parent, args, context) => {
    try {
      if (!context.user && context.user._id) {
        throw new Error('Must be logged in!');
      }
      const doc = Documents.findOne({
        $or: [
          { _id: args._id, owner: context.user && context.user._id ? context.user._id : null },
          { _id: args._id, isPublic: true },
        ],
      });
      return doc || [];
    } catch (error) {
      console.warn('documents error');
      console.warn(error);
      throw new Error(`[Documents] ${error.message}`);
    }
  },
};
