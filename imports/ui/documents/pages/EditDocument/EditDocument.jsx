import React, { useContext } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate, useParams } from 'react-router-dom';

import { Documents } from '../../../../api/Documents/Documents';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import { AuthContext } from '../../../global/context/Authentication';
import DocumentEditor from '../../components/DocumentEditor';

const EditDocument = () => {
  const { userId, isInRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const { documentId } = useParams();
  const isLoading = useSubscribe('document', { documentId });
  const documents = useFind(() => Documents.find({ _id: documentId }));

  if (isLoading()) {
    return <Loading />;
  }

  if (documents && documents.length > 0) {
    const document = documents[0];
    if (document.createdBy === userId || isInRole('admin')) {
      return <DocumentEditor doc={document} />;
    }
  }

  return (
    <BlankState
      icon={{ symbol: 'file-alt' }}
      title="No document found here."
      action={{
        style: 'success',
        onClick: () => navigate('/documents'),
        label: 'Return to document list',
      }}
    />
  );
};

export default EditDocument;
