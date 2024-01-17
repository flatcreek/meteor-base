import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Button, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { isEmailAddress } from '../../../../../modules/isEmailAddress';
import AccountPageFooter from '../../components/AccountPageFooter';
import ExportUserData from '../../components/ExportUserData';
import Styles from './styles';

const Profile = () => {
  const userId = Meteor.userId();
  useSubscribe('user', { userId });
  const users = useFind(() => Meteor.users.find({ _id: userId }));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (Meteor.isDevelopment) {
      console.log('Profile.onSubmit.data:');
      console.log(data);
    }
    const dataObj = {
      email: data.emailAddress,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    };

    Meteor.callAsync('updateUser', dataObj)
      .then(() => {
        Bert.alert('Profile updated!', 'success');
      })
      .catch((error) => {
        Bert.alert(error.message, 'danger');
      });

    if (data.newPassword) {
      Accounts.changePassword(data.currentPassword, data.newPassword, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          data.currentPassword.value = ''; // eslint-disable-line no-param-reassign
          data.newPassword.value = ''; // eslint-disable-line no-param-reassign
        }
      });
    }
  };

  if (users && users.length > 0) {
    const user = users[0];
    const { profile, emails } = user || {};
    const { firstName, lastName } = profile || {};
    const emailAddress = emails[0].address;

    return (
      <Styles.Profile>
        <h4 className="page-header">{profile ? `${firstName} ${lastName}` : emailAddress}</h4>
        <Tabs>
          <Tab eventKey="profile" title="Profile">
            <Row>
              <Col xs={12} sm={6} md={4}>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          defaultValue={(user && user.profile && user.profile.firstName) || ''}
                          {...register('firstName', { required: "What's your first name?" })}
                        />
                        {errors?.firstName && (
                          <span className="text-danger">{errors?.firstName?.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          defaultValue={(user && user.profile && user.profile.lastName) || ''}
                          {...register('lastName', { required: "What's your last name?" })}
                        />
                        {errors?.lastName && (
                          <span className="text-danger">{errors?.lastName?.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="emailAddress"
                      placeholder="Email Address"
                      defaultValue={emailAddress || ''}
                      {...register('emailAddress', {
                        required: "What's your email address?",
                        validate: (value) =>
                          isEmailAddress(value) || 'Is this email address correct?',
                      })}
                    />
                    {errors?.emailAddress && (
                      <span className="text-danger">{errors?.emailAddress?.message}</span>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      placeholder="Password"
                      {...register('currentPassword', {
                        minLength: { value: 6, message: 'Please use at least six characters.' },
                      })}
                    />
                    <Form.Text id="passwordHelpBlock">
                      {errors?.currentPassword ? (
                        <span className="text-danger">{errors?.currentPassword?.message}</span>
                      ) : (
                        <span>Use at least six characters.</span>
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      placeholder="Password"
                      {...register('newPassword', {
                        minLength: { value: 6, message: 'Please use at least six characters.' },
                      })}
                    />
                    <Form.Text id="passwordHelpBlock">
                      {errors?.newPassword ? (
                        <span className="text-danger">{errors?.newPassword?.message}</span>
                      ) : (
                        <span>Use at least six characters.</span>
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Button type="submit" variant="success">
                    Save Profile
                  </Button>
                </Form>
                <AccountPageFooter>
                  <ExportUserData />
                </AccountPageFooter>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Styles.Profile>
    );
  }
  return null;
};

export default Profile;
