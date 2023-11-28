/* eslint-disable consistent-return */

import JSZip from 'jszip';
import Documents from '../../Documents/Documents';

let action;

const generateZip = (zip) => {
  try {
    zip.generateAsync({ type: 'base64' }).then((content) => action.resolve({ zip: content }));
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
    return Documents.find({ owner: _id }).fetch();
  } catch (error) {
    throw new Error(`[exportUserData.getDocuments] ${error.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (error) {
    throw new Error(`[exportUserData.validateOptions] ${error.message}`);
  }
};

const exportUserData = (options) => {
  try {
    validateOptions(options);
    const zip = new JSZip();
    const documents = getDocuments(options.user);
    addDocumentsToZip(documents, zip);
    generateZip(zip);
  } catch (error) {
    action.reject(`[exportUserData] ${error.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject };
    exportUserData(options);
  });
