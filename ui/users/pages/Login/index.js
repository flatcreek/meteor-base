import React, { useRef } from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
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
    <Styles.StyledLogin>
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
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control"
                  placeholder="Email Address"
                  data-test="emailAddress"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="clearfix">
                  <span className="pull-left">Password</span>
                  <Link className="pull-right" to="/recover-password">
                    Forgot password?
                  </Link>
                </ControlLabel>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  data-test="password"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success" block>
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
    </Styles.StyledLogin>
  );
};

export default Login;
