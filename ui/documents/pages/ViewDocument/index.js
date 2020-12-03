import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

import parseMarkdown from '../../../../modules/parseMarkdown';
import SEO from '../../../global/components/SEO';
import BlankState from '../../../global/components/BlankState';
import { document as GET_DOCUMENT } from '../../queries/Documents.gql';
import Styles from './styles';

const { twitterUsername } = Meteor.settings.public;

const ViewDocument = () => {
  const { _id } = useParams();
  const { data, loading } = useQuery(GET_DOCUMENT, {
    variables: { _id },
  });

  if (!loading && data.document) {
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

  if (!loading && !data.document) {
    return (
      <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="No document here, friend!"
        subtitle="Make sure to double check the URL! If it's correct, this is probably a private document."
      />
    );
  }

  return null;
};

export default ViewDocument;
