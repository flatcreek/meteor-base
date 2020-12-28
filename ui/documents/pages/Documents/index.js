import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import flowRight from 'lodash/flowRight';

import { timeago } from '../../../../modules/dates';
import BlankState from '../../../global/components/BlankState';
import { documents } from '../../queries/Documents.gql';
import { addDocument } from '../../mutations/Documents.gql';
import { StyledDocuments, DocumentsList, Document } from './styles';

const Documents = ({ data, mutate }) => (
  <StyledDocuments>
    <header className="clearfix">
      <Button variant="success" onClick={mutate}>
        New Document
      </Button>
    </header>
    {data.documents && data.documents.length ? (
      <DocumentsList>
        {data.documents.map(({ _id, isPublic, title, updatedAt }) => (
          <Document key={_id}>
            <Link to={`/documents/${_id}/edit`} />
            <header>
              {isPublic ? (
                <span className="label label-success">Public</span>
              ) : (
                <span className="label label-default">Private</span>
              )}
              <h2>{title}</h2>
              <p>{timeago(updatedAt)}</p>
            </header>
          </Document>
        ))}
      </DocumentsList>
    ) : (
      <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of documents, friend!"
        subtitle="Add your first document by clicking the button below."
        action={{
          style: 'success',
          onClick: mutate,
          label: 'Create Your First Document',
        }}
      />
    )}
  </StyledDocuments>
);

Documents.propTypes = {
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default flowRight(
  graphql(documents),
  graphql(addDocument, {
    options: ({ history }) => ({
      refetchQueries: [{ query: documents }],
      onCompleted: (mutation) => {
        history.push(`/documents/${mutation.addDocument._id}/edit`);
      },
    }),
  }),
)(Documents);
