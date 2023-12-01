import React, { useContext } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { redirect, useParams } from 'react-router-dom';

import { Documents } from '../../../../api/Documents/Documents';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import { AuthContext } from '../../../global/context/Authentication';
import DocumentEditor from '../../components/DocumentEditor';

const EditDocument = () => {
  const { userId, isInRole } = useContext(AuthContext);
  const { documentId } = useParams();
  const isLoading = useSubscribe('document', { documentId });
  const document = useFind(() => Documents.find({ _id: documentId }));

  if (isLoading()) {
    return <Loading />;
  }

  if (document) {
    if (document.createdBy === userId || isInRole('admin')) {
      return <DocumentEditor doc={document[0]} />;
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
