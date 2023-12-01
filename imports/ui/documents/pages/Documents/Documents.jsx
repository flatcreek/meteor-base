import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

import { Documents } from '../../../../api/Documents/Documents';
import { timeago } from '../../../../../modules/dates';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import Styles from './styles';

const DocumentList = () => {
  const isLoading = useSubscribe('documents');
  const data = useFind(() => Documents.find());

  const handleAddDocument = () => {
    Meteor.callAsync('addDocument')
      .then((response) => {
        console.log('DocumentList.handleAddDocument.response');
        console.log(response);
        const docId =
          response && response.data && response.data.addDocument && response.data.addDocument._id;
        Bert.alert('New document ready!', 'success');
        redirect(`/documents/${docId}/edit`);
      })
      .catch((error) => {
        console.warn('addDocument error:');
        console.warn(error);
        Bert.alert(error.message, 'danger');
      });
  };

  if (isLoading()) {
    return <Loading />;
  }

  console.log('DocumentList.data:');
  console.log(data);

  return (
    <Styles.StyledDocuments>
      <header className="clearfix">
        <Button variant="success" onClick={() => handleAddDocument()}>
          New Document
        </Button>
      </header>
      {data && data.length ? (
        <Row>
          {data.map(({ _id, isPublic, title, updatedAt }) => (
            <Col key={_id} sm={6} md={4} lg={3} className="align-self-stretch p-3">
              <LinkContainer to={`/documents/${_id}`}>
                <Styles.StyledCard>
                  <Card.Body>
                    <Card.Subtitle>
                      {isPublic ? (
                        <Badge bg="info">Public</Badge>
                      ) : (
                        <Badge bg="warning">Private</Badge>
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
            onClick: () => handleAddDocument(),
            label: 'Create Your First Document',
          }}
        />
      )}
    </Styles.StyledDocuments>
  );
};

export default DocumentList;
