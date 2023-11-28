import React, { useContext, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { LinkContainer } from 'react-router-bootstrap';

import { AuthContext } from '../../../global/context/Authentication';
import Styles from './styles';

const { facebook, productName, twitterUsername } = Meteor.settings.public;
const facebookUsername = facebook && facebook.username;

const Logout = () => {
  const { resetAuthState } = useContext(AuthContext);

  useEffect(() => {
    Meteor.logout();
    resetAuthState();
  }, []);

  return (
    <Styles.Logout>
      <h2>You have been successfully logged out</h2>
      <p>{`Don't forget to like and follow ${productName} elsewhere on the web:`}</p>
      <ButtonGroup>
        <Button
          variant="secondary"
          href={`https://facebook.com/${facebookUsername}?utm_source=app&utm_medium=referral&utm_campaign=logoutPage`}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </Button>
        <Button
          variant="secondary"
          href={`https://twitter.com/${twitterUsername}?utm_source=app&utm_medium=referral&utm_campaign=logoutPage`}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Button>
      </ButtonGroup>
      <p className="mt-4">Logged out by accident?</p>
      <LinkContainer to="/login">
        <Button variant="secondary">Log back in</Button>
      </LinkContainer>
    </Styles.Logout>
  );
};

export default Logout;
