/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { isEqual, union, without } from 'lodash';

import Validation from '../../../global/components/Validation';
import Styles from './styles';

const AdminUserProfile = ({ user, updateUser, removeUser }) => {
  const [activeRoles, setActiveRoles] = useState(user.roles && user.roles.__global_roles__);

  useEffect(() => {
    const userRoles = user.roles && user.roles.__global_roles__;
    const rolesEqual = isEqual(activeRoles, userRoles);
    if (!rolesEqual) {
      setActiveRoles(userRoles);
    }
  }, [user]);

  const handleSubmit = (form) => {
    const existingUser = user;
    const isPasswordUser = existingUser && !existingUser.oAuthProvider;
    const roleCheckboxes = document.querySelectorAll('[name="role"]:checked');
    const roles = [];
    [].forEach.call(roleCheckboxes, (role) => {
      roles.push(role.value);
    });

    let userUpdate;

    if (isPasswordUser) {
      userUpdate = {
        _id: existingUser._id,
        email: form.emailAddress.value,
        profile: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
        },
        roles,
      };
    }

    if (!isPasswordUser) {
      userUpdate = {
        roles,
      };
    }

    updateUser(userUpdate);
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
    return (
      <div className="AdminUserProfile">
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
          }}
          messages={{
            firstName: {
              required: "What's the user's first name?",
            },
            lastName: {
              required: "What's the user's last name?",
            },
            emailAddress: {
              required: 'Need an email address here.',
              email: 'Is this email address correct?',
            },
          }}
          submitHandler={(form) => handleSubmit(form)}
        >
          <form onSubmit={(event) => event.preventDefault()}>
            <Row>
              <Col md={6}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        defaultValue={(user && user.profile && user.profile.firstName) || ''}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        disabled={user && user.oAuthProvider}
                        type="text"
                        name="lastName"
                        defaultValue={(user && user.profile && user.profile.lastName) || ''}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      {/* NOTE: Need to add validation to this field if the email is not verified */}
                      <Form.Control
                        type="email"
                        name="emailAddress"
                        autoComplete="off"
                        defaultValue={(user && user.emailAddress) || ''}
                      />
                      {user && !user.emailVerified && (
                        <Form.Text className="text-muted">
                          This email is not verified yet.
                          <Styles.LinkButton
                            variant="link"
                            onClick={() => handleResendVerificationEmail()}
                          >
                            Re-send verification email
                          </Styles.LinkButton>
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                  </Col>
                </Row>
                <Button type="submit" variant="success">
                  {user ? 'Save Changes' : 'Create User'}
                </Button>
                {user && (
                  <Button
                    variant="danger"
                    className="pull-right"
                    onClick={() => handleDeleteUser()}
                  >
                    Delete User
                  </Button>
                )}
              </Col>
            </Row>
          </form>
        </Validation>
      </div>
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
