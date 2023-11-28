import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';

import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import { AuthContext } from '../../../global/context/Authentication';
import DocumentEditor from '../../components/DocumentEditor';
import { editDocument as GET_DOCUMENT } from '../../graphql/queries.gql';

const EditDocument = () => {
  const { userId, isInRole } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const { _id } = useParams();
  const history = useHistory();
  const { data, loading } = useQuery(GET_DOCUMENT, {
    variables: {
      _id,
    },
  });

  if (redirect) {
    return <Redirect push to="/documents" />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data && data.document) {
    if (data.document.owner === userId || isInRole('admin')) {
      return <DocumentEditor doc={data.document} history={history} />;
    }
  }

  return (
    <BlankState
      icon={{ symbol: 'file-alt' }}
      title="No document found here."
      action={{
        style: 'success',
        onClick: () => setRedirect({ redirect: true }),
        label: 'Return to document list',
      }}
    />
  );
};

export default EditDocument;
