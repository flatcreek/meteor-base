import React, { useContext } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router';
import { redirect, useParams } from 'react-router-dom';

import { Documents } from '../../../../api/Documents/Documents';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import { AuthContext } from '../../../global/context/Authentication';
import DocumentEditor from '../../components/DocumentEditor';

const EditDocument = () => {
  const { userId, isInRole } = useContext(AuthContext);
  const { _id } = useParams();
  const isLoading = useSubscribe('documents');
  const data = useFind(() => Documents.find({ _id }));

  if (redirect) {
    return <Redirect push to="/documents" />;
  }

  if (isLoading()) {
    return <Loading />;
  }

  if (data && data.document) {
    if (data.document.owner === userId || isInRole('admin')) {
      return <DocumentEditor doc={data.document} />;
    }
  }

  return (
    <BlankState
      icon={{ symbol: 'file-alt' }}
      title="No document found here."
      action={{
        style: 'success',
        onClick: () => redirect('/documents'),
        label: 'Return to document list',
      }}
    />
  );
};

export default EditDocument;
