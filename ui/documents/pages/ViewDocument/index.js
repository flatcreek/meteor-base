import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { graphql } from '@apollo/client/react/hoc';
import { Link } from 'react-router-dom';

import parseMarkdown from '../../../../modules/parseMarkdown';
import SEO from '../../../global/components/SEO';
import BlankState from '../../../global/components/BlankState';
import { document as documentQuery } from '../../queries/Documents.gql';
import { StyledViewDocument, DocumentBody } from './styles';

const { twitterUsername } = Meteor.settings.public;

class ViewDocument extends React.Component {
  componentDidMount() {
    const { data } = this.props;
    if (Meteor.isClient && Meteor.userId()) data.refetch();
  }

  render() {
    const { data } = this.props;

    if (!data.loading && data.document) {
      return (
        <React.Fragment>
          <StyledViewDocument>
            <SEO
              title={data.document && data.document.title}
              description={data.document && data.document.body}
              path={`documents/${data.document && data.document._id}`}
              contentType="article"
              published={data.document && data.document.createdAt}
              updated={data.document && data.document.updatedAt}
              twitter={`${twitterUsername}`}
            />
            <React.Fragment>
              <h1>{data.document && data.document.title}</h1>
              <DocumentBody
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(data.document && data.document.body),
                }}
              />
              <div>
                <Link to="/documents">Return to documents</Link>
              </div>
            </React.Fragment>
          </StyledViewDocument>
        </React.Fragment>
      );
    }

    if (!data.loading && !data.document) {
      return (
        <BlankState
          icon={{ style: 'solid', symbol: 'file-alt' }}
          title="No document here, friend!"
          subtitle="Make sure to double check the URL! If it's correct, this is probably a private document."
        />
      );
    }

    return null;
  }
}

ViewDocument.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(documentQuery, {
  options: ({ match }) => ({
    variables: {
      _id: match.params._id,
    },
  }),
})(ViewDocument);
