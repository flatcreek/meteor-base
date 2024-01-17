import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { useForm } from 'react-hook-form';

import { isEmailAddress } from '../../../../../modules/isEmailAddress';
import AccountPageFooter from '../AccountPageFooter';
import Styles from './styles';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <Styles.LoginForm className="mt-4">
      <h4 className="page-header">Log In</h4>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            {...register('emailAddress', {
              required: "What's your email address?",
              validate: (value) => isEmailAddress(value) || 'Is this email address correct?',
            })}
          />
          {errors?.emailAddress && (
            <span className="text-danger">{errors?.emailAddress?.message}</span>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            {...register('password', { required: 'Need a password here.' })}
          />
          {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
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
      </AccountPageFooter>
    </Styles.LoginForm>
  );
};

export default LoginForm;
