import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import OAuthLoginButton from '../OAuthLoginButton';
import Loading from '../../../global/components/Loading';
import oAuthServicesQuery from '../../queries/OAuth.gql';
import Styles from './styles';

const OAuthLoginButtons = ({ emailMessage }) => {
  const { data, loading } = useQuery(oAuthServicesQuery);
  const { oAuthServices } = data || {};

  if (loading) {
    return <Loading />;
  }

  if (oAuthServices.length > 0) {
    return (
      <Styles.OAuthLoginButtons emailMessage={emailMessage}>
        {oAuthServices.map((service) => (
          <OAuthLoginButton key={service} service={service} />
        ))}
        {emailMessage && (
          <Styles.EmailMessage offset={emailMessage.offset}>
            {emailMessage.text}
          </Styles.EmailMessage>
        )}
      </Styles.OAuthLoginButtons>
    );
  }
};

OAuthLoginButtons.propTypes = {
  emailMessage: PropTypes.object.isRequired,
};

export default OAuthLoginButtons;
