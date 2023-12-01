import { Meteor } from 'meteor/meteor';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Bert } from 'meteor/themeteorchef:bert';

const DeleteAccount = () => {
  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This will permanently delete your account and all of its data.')) {
      Meteor.callAsync('removeUser')
        .then(() => {
          Bert.alert('User removed!', 'success');
        })
        .catch((error) => {
          Bert.alert(error.message, 'danger');
        });
    }
  };

  return (
    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAccount()}>
      Delete My Account
    </Button>
  );
};

export default DeleteAccount;
