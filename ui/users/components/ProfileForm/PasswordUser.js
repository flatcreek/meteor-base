import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';

import InputHint from '../../../global/components/InputHint';

const PasswordUser = ({ data }) => {
  const thisUser = data && data.user;
  return (
    <div>
      <Row>
        <Col xs={6}>
          <FormGroup>
            <ControlLabel>First Name</ControlLabel>
            <input
              type="text"
              name="firstName"
              defaultValue={thisUser.name && thisUser.name.first}
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
              defaultValue={thisUser.name && thisUser.name.last}
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
          defaultValue={thisUser.emailAddress}
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
};

PasswordUser.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PasswordUser;
