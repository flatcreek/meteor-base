import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import InputHint from '../../../global/components/InputHint';
import Validation from '../../../global/components/Validation';
import AccountPageFooter from '../../components/AccountPageFooter';
import Styles from './styles';

const Signup = () => {
  const handleSubmit = (form) => {
    Accounts.createUser(
      {
        email: form.emailAddress.value,
        password: form.password.value,
        profile: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
        },
      },
      (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Meteor.callAsync('sendVerificationEmail').then(() => {
            Bert.alert('Welcome!', 'success');
            redirect('/');
          });
        }
      },
    );
  };

  return (
    <Styles.Signup>
      <Row>
        <Col xs={12}>
          <h4 className="page-header">Sign Up</h4>
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
                required: true,
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
              password: {
                required: 'Need a password here.',
                minlength: 'Please use at least six characters.',
              },
            }}
            submitHandler={(form) => {
              handleSubmit(form);
            }}
          >
            <form onSubmit={(event) => event.preventDefault()}>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control"
                  placeholder="Email Address"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                />
                <InputHint>Use at least six characters.</InputHint>
              </Form.Group>
              <Button type="submit" variant="success" block>
                Sign Up
              </Button>
              <AccountPageFooter>
                <p>
                  Already have an account? <Link to="/login">Log In</Link>.
                </p>
              </AccountPageFooter>
            </form>
          </Validation>
        </Col>
      </Row>
    </Styles.Signup>
  );
};

export default Signup;
