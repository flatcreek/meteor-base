import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { isEmailAddress } from '../../../../../modules/isEmailAddress';
import AccountPageFooter from '../../components/AccountPageFooter';
import Styles from './styles';

const Signup = () => {
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (Meteor.isDevelopment) {
      console.log('Signup.form:');
      console.log(data);
    }
    Accounts.createUser(
      {
        email: data.emailAddress,
        password: data.password,
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
      (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Meteor.callAsync('sendVerificationEmail').then(() => {
            Bert.alert('Welcome!', 'success');
            navigate('/');
          });
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
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    {...register('firstName', { required: "What's your first name?" })}
                  />
                  {errors?.firstName && (
                    <span className="error-text">{errors?.firstName?.message}</span>
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
                    {...register('lastName', { required: "What's your last name?" })}
                  />
                  {errors?.lastName && (
                    <span className="error-text">{errors?.lastName?.message}</span>
                  )}
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
                {...register('emailAddress', {
                  required: "What's your email address?",
                  validate: (value) => isEmailAddress(value) || 'Is this email address correct?',
                })}
              />
              {errors?.emailAddress && (
                <span className="error-text">{errors?.emailAddress?.message}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                {...register('password', {
                  required: 'Need a password here.',
                  minLength: { value: 6, message: 'Please use at least six characters.' },
                })}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Use at least six characters.
              </Form.Text>
              {errors?.password && <span className="error-text">{errors?.password?.message}</span>}
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" variant="success">
                Sign Up
              </Button>
            </div>
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
