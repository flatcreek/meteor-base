import { Meteor } from 'meteor/meteor';
import React from 'react';
import FileSaver from 'file-saver';
import base64ToBlob from 'b64-to-blob';
import Button from 'react-bootstrap/Button';
import { Bert } from 'meteor/themeteorchef:bert';

const ExportUserData = () => {
  const handleExportData = () => {
    Meteor.callAsync('exportUserData')
      .then((response) => {
        FileSaver.saveAs(base64ToBlob(response.exportUserData.zip), `${Meteor.userId()}.zip`);
      })
      .catch((error) => {
        Bert.alert(error.message, 'danger');
      });
  };

  return (
    <p>
      <Button variant="outline-primary" onClick={() => handleExportData()}>
        Export my data
      </Button>
      {' - '}
      Download all of your documents as .txt files in a .zip
    </p>
  );
};

export default ExportUserData;
