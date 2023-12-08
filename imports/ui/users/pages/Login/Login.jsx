import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { useForm } from 'react-hook-form';

import AccountPageFooter from '../../components/AccountPageFooter';
import Styles from './styles';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (form) => {
    Meteor.loginWithPassword(form.emailAddress, form.password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
      }
    });
  };

  return (
    <Styles.Login>
      <Row>
        <Col xs={12}>
          <h4 className="page-header">Log In</h4>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                className="form-control"
                placeholder="Email Address"
                {...register('emailAddress', {
                  required: "What's your email address?",
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
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" variant="success">
                Log In
              </Button>
            </div>
          </Form>
          <AccountPageFooter>
            <Link className="text-right" to="/recover-password">
              Forgot password?
            </Link>
            <p>
              {"Don't have an account? "} <Link to="/signup">Sign Up</Link>.
            </p>
          </AccountPageFooter>
        </Col>
      </Row>
    </Styles.Login>
  );
};

export default Login;
