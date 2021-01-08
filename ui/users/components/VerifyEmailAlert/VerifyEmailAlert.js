import React, { useContext } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

import { AuthContext } from '../../../global/context/Authentication';
import { sendVerificationEmail as SEND_VERIFICATION } from '../../mutations/Users.gql';
import Styles from './styles';

const VerifyEmailAlert = () => {
  const { emailAddress, emailVerified, userId } = useContext(AuthContext);
  const [sendVerification] = useMutation(SEND_VERIFICATION);

  const handleResendVerification = () => {
    sendVerification();
    Bert.alert(`Check ${emailAddress} for a verification link!`, 'success');
  };

  if (userId && !emailVerified) {
    return (
      <Styles.VerifyEmailAlert variant="primary" className="text-center">
        {!emailVerified && (
          <div>
            Please <strong>verify your email address</strong> ({emailAddress}).
            <Button variant="link" onClick={() => handleResendVerification()} href="#">
              Re-send verification email
            </Button>{' '}
            |
            <LinkContainer to="/settings">
              <Button variant="link">Update email</Button>
            </LinkContainer>
          </div>
        )}
      </Styles.VerifyEmailAlert>
    );
  }
  return null;
};

export default VerifyEmailAlert;
