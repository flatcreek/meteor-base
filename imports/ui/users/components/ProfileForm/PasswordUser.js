import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';

import InputHint from '../../../global/components/InputHint';

const PasswordUser = ({ data }) => {
  const thisUser = data && data.user;
  return (
    <div>
      <Row>
        <Col xs={6}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <input
              type="text"
              name="firstName"
              defaultValue={thisUser.name && thisUser.name.first}
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <input
              type="text"
              name="lastName"
              defaultValue={thisUser.name && thisUser.name.last}
              className="form-control"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>Email Address</Form.Label>
        <input
          type="email"
          name="emailAddress"
          defaultValue={thisUser.emailAddress}
          className="form-control"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Current Password</Form.Label>
        <input type="password" name="currentPassword" className="form-control" />
      </Form.Group>
      <Form.Group>
        <Form.Label>New Password</Form.Label>
        <input type="password" name="newPassword" className="form-control" />
        <InputHint>Use at least six characters.</InputHint>
      </Form.Group>
      <Button type="submit" variant="success">
        Save Profile
      </Button>
    </div>
  );
};

PasswordUser.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PasswordUser;
