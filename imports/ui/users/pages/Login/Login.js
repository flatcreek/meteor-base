import React, { useRef } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import Validation from '../../../global/components/Validation';
import OAuthLoginButtons from '../../components/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter';
import Styles from './styles';

const Login = () => {
  const formRef = useRef();
  const handleSubmit = (form) => {
    Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
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
          <Row>
            <Col xs={12}>
              <OAuthLoginButtons
                emailMessage={{
                  offset: 100,
                  text: 'Log In with an Email Address',
                }}
              />
            </Col>
          </Row>
          <Validation
            rules={{
              emailAddress: {
                required: true,
                email: true,
              },
              password: {
                required: true,
              },
            }}
            messages={{
              emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address correct?',
              },
              password: {
                required: 'Need a password here.',
              },
            }}
            submitHandler={(form) => {
              handleSubmit(form);
            }}
          >
            <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control"
                  placeholder="Email Address"
                  data-test="emailAddress"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="clearfix">
                  <span className="pull-left">Password</span>
                </Form.Label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  data-test="password"
                />
                <Link className="text-right" to="/recover-password">
                  Forgot password?
                </Link>
              </Form.Group>
              <Button type="submit" variant="success" block>
                Log In
              </Button>
              <AccountPageFooter>
                <p>
                  {"Don't have an account? "} <Link to="/signup">Sign Up</Link>.
                </p>
              </AccountPageFooter>
            </form>
          </Validation>
        </Col>
      </Row>
    </Styles.Login>
  );
};

export default Login;
