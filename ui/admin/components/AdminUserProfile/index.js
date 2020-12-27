import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  FormGroup,
  HelpBlock,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { isEqual, union, without } from 'lodash';

import Validation from '../../../global/components/Validation';
import { sendVerificationEmail as SEND_VERIFICATION } from '../../../users/mutations/Users.gql';

const AdminUserProfile = ({ user, updateUser, removeUser }) => {
  const [sendVerification] = useMutation(SEND_VERIFICATION);
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
          name: {
            first: form.firstName.value,
            last: form.lastName.value,
          },
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
    sendVerification({ variables: { userId: user._id } });
  };

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
          {user && (
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <ControlLabel>First Name</ControlLabel>
                      <input
                        disabled={user && user.oAuthProvider}
                        type="text"
                        name="firstName"
                        className="form-control"
                        defaultValue={(user && user.name && user.name.first) || ''}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup>
                      <ControlLabel>Last Name</ControlLabel>
                      <input
                        disabled={user && user.oAuthProvider}
                        type="text"
                        name="lastName"
                        className="form-control"
                        defaultValue={(user && user.name && user.name.last) || ''}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {user && user.username && (
                  <Row>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>Username</ControlLabel>
                        <input
                          disabled={user && user.oAuthProvider}
                          type="text"
                          name="username"
                          className="form-control"
                          defaultValue={user && user.username}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col xs={12}>
                    <FormGroup validationState={user.emailVerified ? null : 'error'}>
                      <ControlLabel>Email Address</ControlLabel>
                      <input
                        type="email"
                        name="emailAddress"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={(user && user.emailAddress) || ''}
                      />
                      {user && !user.emailVerified && (
                        <HelpBlock>
                          This email is not verified yet.
                          <Button
                            bsStyle="link"
                            onClick={() => handleResendVerificationEmail()}
                            href="#"
                          >
                            Re-send verification email
                          </Button>
                        </HelpBlock>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Roles</ControlLabel>
                      <ListGroup>
                        <ListGroupItem key="admin">
                          <Checkbox
                            name="role"
                            value="admin"
                            checked={userIsInRole('admin') || false}
                            onChange={handleCheckboxChange}
                            inline
                          >
                            Admin
                          </Checkbox>
                        </ListGroupItem>
                        <ListGroupItem key="user">
                          <Checkbox
                            name="role"
                            value="user"
                            checked={userIsInRole('user')}
                            onChange={handleCheckboxChange}
                            inline
                          >
                            User
                          </Checkbox>
                        </ListGroupItem>
                      </ListGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Button type="submit" bsStyle="success">
                  {user ? 'Save Changes' : 'Create User'}
                </Button>
                {user && (
                  <Button
                    bsStyle="danger"
                    className="pull-right"
                    onClick={() => handleDeleteUser()}
                  >
                    Delete User
                  </Button>
                )}
              </Col>
            </Row>
          )}
        </form>
      </Validation>
    </div>
  );
};

AdminUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default AdminUserProfile;
