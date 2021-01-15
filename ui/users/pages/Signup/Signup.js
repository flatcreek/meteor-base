import React from 'react';
import { useMutation } from '@apollo/client';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { useForm } from 'react-hook-form';

import { isEmailAddress } from '../../../../modules/isEmailAddress';
import AccountPageFooter from '../../components/AccountPageFooter';
import { sendVerificationEmail as SEND_VERIFICATION } from '../../graphql/mutations.gql';
import Styles from './styles';

const Signup = () => {
  const [sendVerification] = useMutation(SEND_VERIFICATION);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    Accounts.createUser(
      {
        email: data.emailAddress,
        password: data.password,
        profile: {
          name: {
            first: data.firstName,
            last: data.lastName,
          },
        },
      },
      (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          sendVerification();
          Bert.alert('Welcome!', 'success');
          history.push('/');
        }
      },
    );
  };

  return (
    <Styles.Signup className="mt-4">
      <Row>
        <Col xs={12}>
          <h4 className="page-header">Sign Up</h4>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    ref={register({ required: "What's your first name?" })}
                  />
                  {errors.firstName && (
                    <span className="error-text">{errors.firstName.message}</span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    ref={register({ required: "What's your last name?" })}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName.message}</span>}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                className="form-control"
                placeholder="Email Address"
                ref={register({
                  required: "What's your email address?",
                  validate: (value) => isEmailAddress(value) || 'Is this email address correct?',
                })}
              />
              {errors.emailAddress && (
                <span className="error-text">{errors.emailAddress.message}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                ref={register({
                  required: 'Need a password here.',
                  minLength: { value: 6, message: 'Please use at least six characters.' },
                })}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Use at least six characters.
              </Form.Text>
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </Form.Group>
            <Button type="submit" variant="success" block>
              Sign Up
            </Button>
          </Form>
          <AccountPageFooter>
            <p>
              Already have an account? <Link to="/login">Log In</Link>.
            </p>
          </AccountPageFooter>
        </Col>
      </Row>
    </Styles.Signup>
  );
};

export default Signup;
