import React, { useEffect, useState } from 'react';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  ControlLabel,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Checkbox,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { capitalize } from 'lodash';
import { Random } from 'meteor/random';

import InputHint from '../../../global/components/InputHint';
import Icon from '../../../global/components/Icon';
import Validation from '../../../global/components/Validation';

const AdminUserProfile = ({ user, updateUser, removeUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [userRoles, setUserRoles] = useState(user.roles && user.roles.__global_roles__);

  useEffect(() => {
    console.log('AdminUserProfile - checking role useEffect');
    const allRoles = Roles.getAllRoles().count();
    console.log(allRoles);
    Roles.getAllRoles().map((role) => {
      console.log(role);
    });
  }, []);

  const handleSubmit = (form) => {
    const existingUser = user;
    const isPasswordUser = existingUser && !existingUser.oAuthProvider;
    const userPassword = isPasswordUser ? form.password.value : null;
    const roleCheckboxes = document.querySelectorAll('[name="role"]:checked');
    const roles = [];
    [].forEach.call(roleCheckboxes, (role) => {
      roles.push(role.value);
    });

    let userUpdate;

    if (isPasswordUser) {
      userUpdate = {
        email: form.emailAddress.value,
        password: userPassword,
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

    if (existingUser) userUpdate._id = existingUser._id;
    updateUser({ variables: { user: userUpdate } }, () => setPassword(''));
  };

  const handleDeleteUser = () => {
    if (confirm("Are you sure? This will permanently delete this user's account!")) {
      removeUser({
        variables: {
          _id: user._id,
        },
      });
    }
  };

  const generatePassword = () => {
    setPassword(Random.hexString(20));
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
          password: {
            minlength: 6,
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
          password: {
            minlength: 'Please use at least six characters.',
          },
        }}
        submitHandler={(form) => handleSubmit(form)}
      >
        <form onSubmit={(event) => event.preventDefault()}>
          {user && (
            <Row>
              <Col xs={12} md={6}>
                {user && user.name && (
                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <ControlLabel>First Name</ControlLabel>
                        <input
                          disabled={user && user.oAuthProvider}
                          type="text"
                          name="firstName"
                          className="form-control"
                          defaultValue={user && user.name && user.name.first}
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
                          defaultValue={user && user.name && user.name.last}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
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
                    <FormGroup>
                      <ControlLabel>Email Address</ControlLabel>
                      <input
                        disabled={user && user.oAuthProvider}
                        type="text"
                        name="emailAddress"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={user && user.emailAddress}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Roles</ControlLabel>
                      <ListGroup>
                        {user.roles.map(({ _id, name, inRole }) => (
                          <ListGroupItem key={_id}>
                            <Checkbox name="role" value={name} defaultChecked={inRole} inline>
                              {capitalize(name)}
                            </Checkbox>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </FormGroup>
                  </Col>
                </Row>
                {user && !user.oAuthProvider && (
                  <Row>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>
                          Password
                          <Checkbox
                            inline
                            checked={showPassword}
                            className="pull-right"
                            onChange={() => setShowPassword(!showPassword)}
                          >
                            Show Password
                          </Checkbox>
                        </ControlLabel>
                        <InputGroup>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="form-control"
                            autoComplete="off"
                            value={password}
                            onChange={(event) => {
                              setPassword(event.target.value);
                            }}
                          />
                          <InputGroup.Button>
                            <Button onClick={() => generatePassword}>
                              <Icon iconStyle="solid" icon="refresh" />
                              {' Generate'}
                            </Button>
                          </InputGroup.Button>
                        </InputGroup>
                        <InputHint>Use at least six characters.</InputHint>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <Button type="submit" bsStyle="success">
                  {user ? 'Save Changes' : 'Create User'}
                </Button>
                {user && (
                  <Button bsStyle="danger" className="pull-right" onClick={() => handleDeleteUser}>
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
