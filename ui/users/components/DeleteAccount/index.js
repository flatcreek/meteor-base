import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';

import { removeUser as REMOVE_USER } from '../../mutations/Users.gql';

const DeleteAccount = () => {
  const [removeUser] = useMutation(REMOVE_USER);

  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This will permanently delete your account and all of its data.')) {
      removeUser({
        onCompleted: () => {
          Bert.alert('User removed!', 'success');
        },
        onError: (error) => {
          Bert.alert(error.message, 'danger');
        },
      });
    }
  };

  return (
    <Button variant="danger" onClick={() => handleDeleteAccount()}>
      Delete My Account
    </Button>
  );
};

export default DeleteAccount;
