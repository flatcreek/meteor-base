import React from 'react';
import { useLazyQuery } from '@apollo/client';
import FileSaver from 'file-saver';
import base64ToBlob from 'b64-to-blob';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';

import { exportUserData as GET_USERDATAEXPORT } from '../../queries/Users.gql';

const ExportUserData = () => {
  const [exportUserData] = useLazyQuery(GET_USERDATAEXPORT, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      FileSaver.saveAs(base64ToBlob(data.exportUserData.zip), `${Meteor.userId()}.zip`);
    },
  });

  const handleExportData = async () => {
    await exportUserData();
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
