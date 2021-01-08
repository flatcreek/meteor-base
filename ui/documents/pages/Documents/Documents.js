import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

import { timeago } from '../../../../modules/dates';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import { documents as GET_DOCUMENTS } from '../../queries/Documents.gql';
import { addDocument as ADD_DOCUMENT } from '../../mutations/Documents.gql';
import Styles from './styles';

const Documents = () => {
  const history = useHistory();
  const { data, loading } = useQuery(GET_DOCUMENTS);
  const [addDocument] = useMutation(ADD_DOCUMENT);

  const handleAddDocument = () => {
    addDocument({
      refetchQueries: [{ query: GET_DOCUMENTS }],
    })
      .then((response) => {
        const docId =
          response && response.data && response.data.addDocument && response.data.addDocument._id;
        Bert.alert('New document ready!', 'success');
        history.push(`/documents/${docId}/edit`);
      })
      .catch((error) => {
        console.warn('addDocument error:');
        console.warn(error);
        Bert.alert(error.message, 'danger');
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Styles.StyledDocuments>
      <header className="clearfix">
        <Button variant="success" onClick={() => handleAddDocument()}>
          New Document
        </Button>
      </header>
      {data.documents && data.documents.length ? (
        <Row>
          {data.documents.map(({ _id, isPublic, title, updatedAt }) => (
            <Col key={_id} sm={6} md={4} lg={3} className="align-self-stretch p-3">
              <LinkContainer to={`/documents/${_id}/edit`}>
                <Styles.StyledCard>
                  <Card.Body>
                    <Card.Subtitle>
                      {isPublic ? (
                        <Badge variant="secondary">Secondary</Badge>
                      ) : (
                        <Badge variant="secondary">Private</Badge>
                      )}
                    </Card.Subtitle>
                    <Card.Title className="mt-2">{title}</Card.Title>
                    <Card.Text className="text-muted">
                      <small>{timeago(updatedAt)}</small>
                    </Card.Text>
                  </Card.Body>
                </Styles.StyledCard>
              </LinkContainer>
            </Col>
          ))}
        </Row>
      ) : (
        <BlankState
          icon={{ symbol: 'file-alt' }}
          title="You're plum out of documents, friend!"
          subtitle="Add your first document by clicking the button below."
          action={{
            style: 'success',
            onClick: addDocument(),
            label: 'Create Your First Document',
          }}
        />
      )}
    </Styles.StyledDocuments>
  );
};

export default Documents;
