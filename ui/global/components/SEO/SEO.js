import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

const seoImages = {
  facebook: ['open-graph-facebook.png'],
  twitter: ['open-graph-twitter.png'],
};

const { facebook, productName, productTagline, twitterUsername } = Meteor.settings.public;
const fbAppId = facebook && facebook.appId;

const seoImageURL = (file) => `https://s3.amazonaws.com/caucusroom-assets/${file}`;

const seoURL = (path) => Meteor.absoluteUrl(path);

const seoTitle = (title, isHome) => {
  if (!isHome && title !== productName) {
    return `${title} | ${productName}`;
  }
  return productName;
};

const seoDescription = (description) => {
  if (description) {
    return description;
  }
  return productTagline;
};

const seoTwitter = (twitter) => {
  if (twitter) {
    return twitter;
  }
  return twitterUsername;
};

const SEO = ({
  schema,
  title,
  description,
  path,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  images,
  isHome,
}) => (
  <Helmet>
    <html lang="en" className="h-100" itemScope itemType={`http://schema.org/${schema}`} />
    <meta charset="utf-8" />

    <title>{seoTitle(title, isHome)}</title>
    <meta name="description" content={seoDescription(description)} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={`@${twitterUsername}`} />
    <meta name="twitter:creator" content={seoTwitter(twitter)} />

    <meta property="og:title" content={seoTitle(title, isHome)} />
    <meta property="og:type" content={contentType || 'website'} />
    <meta property="og:url" content={seoURL(path)} />
    <meta
      property="og:image"
      content={(images && images.facebook) || seoImageURL(seoImages.facebook)}
    />
    <meta property="og:description" content={seoDescription(description)} />
    <meta property="og:site_name" content={productName} />
    <meta property="fb:app_id" content={fbAppId} />

    {published && <meta name="article:published_time" content={published} />}
    {updated && <meta name="article:modified_time" content={updated} />}
    {category && <meta name="article:section" content={category} />}
    {tags && <meta name="article:tag" content={tags} />}
    <body className="h-100" />
  </Helmet>
);

SEO.defaultProps = {
  schema: null,
  title: null,
  description: productTagline,
  path: null,
  contentType: 'website',
  published: null,
  updated: null,
  category: null,
  tags: [],
  twitter: null,
  images: {},
  isHome: false,
};

SEO.propTypes = {
  schema: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  contentType: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  twitter: PropTypes.string,
  images: PropTypes.object,
  isHome: PropTypes.bool,
};

export default SEO;
