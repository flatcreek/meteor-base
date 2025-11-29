/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { isEqual, union, without } from 'lodash';
import PropTypes from 'prop-types';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { isEmailAddress } from '../../../../../modules/isEmailAddress';
import Styles from './styles';

const AdminUserProfile = ({ user, updateUser, removeUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeRoles, setActiveRoles] = useState(user.roles && user.roles.__global_roles__);

  useEffect(() => {
    const userRoles = user.roles && user.roles.__global_roles__;
    const rolesEqual = isEqual(activeRoles, userRoles);
    if (!rolesEqual) {
      setActiveRoles(userRoles);
    }
  }, [user]);

  const onSubmit = (data) => {
    if (Meteor.isDevelopment) {
      console.log('AdminUserProfile.onSubmit.data:');
      console.log(data);
    }
    const existingUser = user;
    const roleCheckboxes = document.querySelectorAll('[name="role"]:checked');
    const roles = [];
    [].forEach.call(roleCheckboxes, (role) => {
      roles.push(role.value);
    });

    const dataObj = {
      _id: existingUser._id,
      email: data.emailAddress,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      roles,
    };

    updateUser(dataObj);
  };

  const handleDeleteUser = () => {
    if (confirm("Are you sure? This will permanently delete this user's account!")) {
      removeUser();
    }
  };

  const userIsInRole = (role) => {
    const hasThisRole = activeRoles && activeRoles.includes(role);
    return hasThisRole;
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked === true) {
      const uniqRoles = union(activeRoles, [value]);
      setActiveRoles(uniqRoles);
    } else {
      const newRoles = without(activeRoles, value);
      setActiveRoles(newRoles);
    }
  };

  const handleResendVerificationEmail = () => {
    Meteor.callAsync('sendVerificationEmail', { userId: user._id });
  };

  if (user) {
    const emailAddress = user?.emails[0].address;
    const emailVerified = user?.emails[0].verified;
    return (
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
              {errors?.lastName && <span className="text-danger">{errors?.lastName?.message}</span>}
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
              validate: (value) => isEmailAddress(value) || 'Is this email address correct?',
            })}
          />
          {errors?.emailAddress && (
            <span className="text-danger">{errors?.emailAddress?.message}</span>
          )}
          {!emailVerified && (
            <Form.Text className="text-muted">
              This email is not verified yet.
              <Styles.LinkButton variant="link" onClick={() => handleResendVerificationEmail()}>
                Re-send verification email
              </Styles.LinkButton>
            </Form.Text>
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
          <Form.Text id="passwordHelpBlock" muted>
            Use at least six characters.
          </Form.Text>
          {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
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
          <Form.Text id="passwordHelpBlock" muted>
            Use at least six characters.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Roles</Form.Label>
          <ListGroup>
            <ListGroup.Item>
              <Form.Check
                name="role"
                value="admin"
                type="checkbox"
                checked={userIsInRole('admin') || false}
                onChange={handleCheckboxChange}
                label="Admin"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                name="role"
                value="user"
                type="checkbox"
                checked={userIsInRole('user') || false}
                onChange={handleCheckboxChange}
                label="User"
              />
            </ListGroup.Item>
          </ListGroup>
        </Form.Group>
        <Button type="submit" variant="success">
          {user ? 'Save Changes' : 'Create User'}
        </Button>
        {user && (
          <Button variant="danger" className="pull-right" onClick={() => handleDeleteUser()}>
            Delete User
          </Button>
        )}
      </Form>
    );
  }
  return null;
};

AdminUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default AdminUserProfile;
