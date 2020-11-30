import React, { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import FileSaver from 'file-saver';
import base64ToBlob from 'b64-to-blob';
import { Row, Col, FormGroup, ControlLabel, Button, Tabs, Tab } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import Validation from '../../../global/components/Validation';
import InputHint from '../../../global/components/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter';
import UserSettings from '../../components/UserSettings';
import { user as GET_USER, exportUserData as GET_USERDATAEXPORT } from '../../queries/Users.gql';
import { updateUser as UPDATE_USER, removeUser as REMOVE_USER } from '../../mutations/Users.gql';
import Styles from './styles';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { data: user } = useQuery(GET_USER);
  const [exportUserData] = useLazyQuery(GET_USERDATAEXPORT, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      FileSaver.saveAs(base64ToBlob(data.exportUserData.zip), `${Meteor.userId()}.zip`);
    },
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [removeUser] = useMutation(REMOVE_USER);

  const getUserType = () => (user.oAuthProvider ? 'oauth' : 'password');

  const handleExportData = async (event) => {
    event.preventDefault();
    exportUserData();
  };

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
      onCompleted: () => {
        Bert.alert('Profile updated!', 'success');
      },
      onError: (error) => {
        Bert.alert(error.message, 'danger');
      },
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

  const renderOAuthUser = () => (
    <div className="OAuthProfile">
      <div key={user.oAuthProvider} className={`LoggedInWith ${user.oAuthProvider}`}>
        <img src={`/${user.oAuthProvider}.svg`} alt={user.oAuthProvider} />
        <p>
          {`You're logged in with ${capitalize(user.oAuthProvider)} using the email address ${
            user.emailAddress
          }.`}
        </p>
        <Button
          className={`btn btn-${user.oAuthProvider}`}
          href={
            {
              facebook: 'https://www.facebook.com/settings',
              google: 'https://myaccount.google.com/privacy#personalinfo',
              github: 'https://github.com/settings/profile',
            }[user.oAuthProvider]
          }
          target="_blank"
        >
          {'Edit Profile on '}
          {capitalize(user.oAuthProvider)}
        </Button>
      </div>
    </div>
  );

  const renderPasswordUser = () => (
    <div>
      <Row>
        <Col xs={6}>
          <FormGroup>
            <ControlLabel>First Name</ControlLabel>
            <input
              type="text"
              name="firstName"
              defaultValue={user.name.first}
              className="form-control"
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <ControlLabel>Last Name</ControlLabel>
            <input
              type="text"
              name="lastName"
              defaultValue={user.name.last}
              className="form-control"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <ControlLabel>Email Address</ControlLabel>
        <input
          type="email"
          name="emailAddress"
          defaultValue={user.emailAddress}
          className="form-control"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Current Password</ControlLabel>
        <input type="password" name="currentPassword" className="form-control" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>New Password</ControlLabel>
        <input type="password" name="newPassword" className="form-control" />
        <InputHint>Use at least six characters.</InputHint>
      </FormGroup>
      <Button type="submit" bsStyle="success">
        Save Profile
      </Button>
    </div>
  );

  const renderProfileForm = () => {
    user &&
      {
        password: renderPasswordUser,
        oauth: renderOAuthUser,
      }[getUserType(user)](user);
  };

  return user ? (
    <Styles.Profile>
      <h4 className="page-header">
        {user.name ? `${user.name.first} ${user.name.last}` : user.username}
      </h4>
      <Tabs
        animation={false}
        activeKey={activeTab}
        onSelect={(newTab) => setActiveTab(newTab)}
        id="admin-user-tabs"
      >
        <Tab eventKey="profile" title="Profile">
          <Row>
            <Col xs={12} sm={6} md={4}>
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
                <form onSubmit={(event) => event.preventDefault()}>{renderProfileForm()}</form>
              </Validation>
              <AccountPageFooter>
                <p>
                  <Button bsStyle="link" className="btn-export" onClick={() => handleExportData()}>
                    Export my data
                  </Button>
                  {' - '}
                  Download all of your documents as .txt files in a .zip
                </p>
              </AccountPageFooter>
              <AccountPageFooter>
                <Button bsStyle="danger" onClick={() => handleDeleteAccount()}>
                  Delete My Account
                </Button>
              </AccountPageFooter>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="settings" title="Settings">
          <UserSettings settings={user.settings} updateUser={updateUser} />
        </Tab>
      </Tabs>
    </Styles.Profile>
  ) : (
    <div />
  );
};

export default Profile;
