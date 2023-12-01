/* eslint-disable consistent-return */
import { Meteor } from 'meteor/meteor';
import JSZip from 'jszip';

import { Documents } from '../../Documents/Documents';

const generateZip = (zip) => {
  try {
    zip.generateAsync({ type: 'base64' }).then((content) => {
      return { zip: content };
    });
  } catch (error) {
    throw new Error(`[exportUserData.generateZip] ${error.message}`);
  }
};

const addDocumentsToZip = (documents, zip) => {
  try {
    documents.forEach((document) => {
      zip.file(`${document.title}.txt`, `${document.title}\n\n${document.body}`);
    });
  } catch (error) {
    throw new Error(`[exportUserData.addDocumentsToZip] ${error.message}`);
  }
};

const getDocuments = ({ _id }) => {
  try {
    return Documents.find({ createdBy: _id }).fetch();
  } catch (error) {
    throw new Error(`[exportUserData.getDocuments] ${error.message}`);
  }
};

const validateOptions = () => {
  try {
    if (!Meteor.userId()) {
      throw new Error('You must be logged in to do this.');
    }
  } catch (error) {
    throw new Error(`[exportUserData.validateOptions] ${error.message}`);
  }
};

const exportUserData = async (options) => {
  try {
    validateOptions();
    const zip = new JSZip();
    const documents = getDocuments(options.user);
    addDocumentsToZip(documents, zip);
    return generateZip(zip);
  } catch (error) {
    throw new Meteor.Error(500, `[exportUserData] ${error.message}`);
  }
};

export default exportUserData;
