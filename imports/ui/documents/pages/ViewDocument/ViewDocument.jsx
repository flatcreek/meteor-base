import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

import parseMarkdown from '../../../../modules/parseMarkdown';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import SEO from '../../../global/components/SEO';
import { document as GET_DOCUMENT } from '../../queries/Documents.gql';
import Styles from './styles';

const { twitterUsername } = Meteor.settings.public;

const ViewDocument = () => {
  const { _id } = useParams();
  const { data, loading, error } = useQuery(GET_DOCUMENT, {
    variables: { _id },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <BlankState
        icon={{ color: 'danger', symbol: 'exclamation-triangle' }}
        title="Whoops! We hit a snag."
        subtitle={error.message}
      />
    );
  }

  if (data && data.document) {
    return (
      <Styles.StyledViewDocument>
        <SEO
          title={data.document && data.document.title}
          description={data.document && data.document.body}
          path={`documents/${data.document && data.document._id}`}
          contentType="article"
          published={data.document && data.document.createdAt}
          updated={data.document && data.document.updatedAt}
          twitter={`${twitterUsername}`}
        />
        <h1>{data.document && data.document.title}</h1>
        <Styles.DocumentBody
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(data.document && data.document.body),
          }}
        />
        <div>
          <Link to="/documents">Return to documents</Link>
        </div>
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
