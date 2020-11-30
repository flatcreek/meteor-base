import React, { useContext } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { useMutation } from '@apollo/client';
import { Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { AuthContext } from '../../../global/context/Authentication';
import { sendVerificationEmail as SEND_VERIFICATION } from '../../mutations/Users.gql';
import Styles from './styles';

const VerifyEmailAlert = () => {
  const { emailAddress, emailVerified, loading, userId } = useContext(AuthContext);
  const [sendVerification] = useMutation(SEND_VERIFICATION);

  const handleResendVerification = () => {
    sendVerification();
    Bert.alert(`Check ${emailAddress} for a verification link!`, 'success');
  };

  if (!loading && userId && !emailVerified) {
    return (
      <Styles.VerifyEmailAlert>
        <Alert bsStyle="info" className="text-center">
          {!emailVerified && (
            <p>
              Please <strong>verify your email address</strong> ({emailAddress}).
              <Button bsStyle="link" onClick={() => handleResendVerification()} href="#">
                Re-send verification email
              </Button>{' '}
              |
              <LinkContainer to="/settings">
                <Button bsStyle="link">Update email</Button>
              </LinkContainer>
            </p>
          )}
        </Alert>
      </Styles.VerifyEmailAlert>
    );
  }
  return null;
};

export default VerifyEmailAlert;
