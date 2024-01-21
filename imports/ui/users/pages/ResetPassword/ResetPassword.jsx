import React, { useRef } from 'react';
import { Row, Col, Alert, Form, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../../../global/components/Validation';
import AccountPageFooter from '../../components/AccountPageFooter';
import StyledResetPassword from './styles';

const ResetPassword = () => {
  const { token } = useParams();
  const formRef = useRef();

  const handleSubmit = (form) => {
    Accounts.resetPassword(token, form.newPassword.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        history.push('/documents');
      }
    });
  };

  return (
    <StyledResetPassword>
      <Row>
        <Col xs={12}>
          <h4 className="page-header">Reset Password</h4>
          <Alert variant="info">
            To reset your password, enter a new one below. You will be logged in with your new
            password.
          </Alert>
          <Validation
            rules={{
              newPassword: {
                required: true,
                minlength: 6,
              },
              repeatNewPassword: {
                required: true,
                minlength: 6,
                equalTo: '[name="newPassword"]',
              },
            }}
            messages={{
              newPassword: {
                required: 'Enter a new password, please.',
                minlength: 'Use at least six characters, please.',
              },
              repeatNewPassword: {
                required: 'Repeat your new password, please.',
                equalTo: "Hmm, your passwords don't match. Try again?",
              },
            }}
            submitHandler={(form) => {
              handleSubmit(form);
            }}
          >
            <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  placeholder="New Password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Repeat New Password</Form.Label>
                <input
                  type="password"
                  className="form-control"
                  name="repeatNewPassword"
                  placeholder="Repeat New Password"
                />
              </Form.Group>
              <Button type="submit" variant="success" block>
                Reset Password &amp; Login
              </Button>
              <AccountPageFooter>
                <p>
                  {"Not sure why you're here? "}
                  <Link to="/login">Log In</Link>.
                </p>
              </AccountPageFooter>
            </form>
          </Validation>
        </Col>
      </Row>
    </StyledResetPassword>
  );
};

export default ResetPassword;
