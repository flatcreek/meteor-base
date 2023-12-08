import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Meteor } from 'meteor/meteor';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { monthDayYearAtTime, iso } from '../../../../../modules/dates';
import parseMarkdown from '../../../../../modules/parseMarkdown';
import { Documents } from '../../../../api/Documents/Documents';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import SEO from '../../../global/components/SEO';
import Styles from './styles';

const { twitterUsername } = Meteor.settings.public;

const ViewDocument = () => {
  const { documentId } = useParams();
  const isLoading = useSubscribe('document', { documentId });
  const document = useFind(() => Documents.find({ _id: documentId }));

  if (isLoading()) {
    return <Loading />;
  }

  if (document) {
    const { title, body, createdAt, createdBy, updatedAt } = document[0] || {};
    const isOwner = () => {
      return createdBy === Meteor.userId();
    };

    return (
      <Styles.StyledViewDocument>
        <SEO
          title={title}
          description={body}
          path={`documents/${documentId}`}
          contentType="article"
          published={iso(createdAt)}
          updated={iso(updatedAt)}
          twitter={`${twitterUsername}`}
        />
        <h2>{title}</h2>
        <p className="fs-6 fw-lighter">Published {monthDayYearAtTime(createdAt)}</p>
        <Styles.DocumentBody
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(body),
          }}
        />
        {isOwner && (
          <Styles.StyledAlert variant="light" className="mt-4">
            <FontAwesomeIcon icon="chevron-right" />
            <LinkContainer to="edit">
              <Styles.StyledAlert.Link>Edit document</Styles.StyledAlert.Link>
            </LinkContainer>
          </Styles.StyledAlert>
        )}
        <Styles.StyledAlert variant="light" className="mt-4">
          <FontAwesomeIcon icon="chevron-left" />
          <LinkContainer to="/documents">
            <Styles.StyledAlert.Link>Return to documents</Styles.StyledAlert.Link>
          </LinkContainer>
        </Styles.StyledAlert>
      </Styles.StyledViewDocument>
    );
  }

  return (
    <BlankState
      icon={{ symbol: 'file-alt' }}
      title="No document here, friend!"
      subtitle="Make sure to double check the URL! If it's correct, this is probably a private document."
    />
  );
};

export default ViewDocument;
