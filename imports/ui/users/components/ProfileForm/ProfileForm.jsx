import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import Validation from '../../../global/components/Validation';
import { user as GET_USER } from '../../queries/Users.gql';
import { updateUser as UPDATE_USER } from '../../mutations/Users.gql';
// import oAuthUser from '../../pages/Profile/OAuthUser';
import PasswordUser from './PasswordUser';

const ProfileForm = ({ user }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = (form) => {
    updateUser({
      variables: {
        user: {
          email: form.emailAddress.value,
          profile: {
            name: {
              first: form.firstName.value,
              last: form.lastName.value,
            },
          },
        },
      },
      refetchQueries: [{ query: GET_USER }],
    })
      .then(() => {
        Bert.alert('Profile updated!', 'success');
      })
      .catch((error) => {
        Bert.alert(error.message, 'danger');
      });

    if (form.newPassword.value) {
      Accounts.changePassword(form.currentPassword.value, form.newPassword.value, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          form.currentPassword.value = ''; // eslint-disable-line no-param-reassign
          form.newPassword.value = ''; // eslint-disable-line no-param-reassign
        }
      });
    }
  };

  return (
    <Validation
      rules={{
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        currentPassword: {
          required() {
            // Only required if newPassword field has a value.
            return document.querySelector('[name="newPassword"]').value.length > 0;
          },
        },
        newPassword: {
          required() {
            // Only required if currentPassword field has a value.
            return document.querySelector('[name="currentPassword"]').value.length > 0;
          },
          minlength: 6,
        },
      }}
      messages={{
        firstName: {
          required: "What's your first name?",
        },
        lastName: {
          required: "What's your last name?",
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        currentPassword: {
          required: 'Need your current password if changing.',
        },
        newPassword: {
          required: 'Need your new password if changing.',
        },
      }}
      submitHandler={(form) => handleSubmit(form)}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <PasswordUser data={user} />
      </form>
    </Validation>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileForm;
