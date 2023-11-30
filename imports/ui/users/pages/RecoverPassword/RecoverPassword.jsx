import React, { useRef } from 'react';
import { Row, Col, Alert, Form, Button } from 'react-bootstrap';
import { Link, redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import Validation from '../../../global/components/Validation';
import AccountPageFooter from '../../components/AccountPageFooter';
import Styles from './styles';

const RecoverPassword = () => {
  const formRef = useRef();

  const handleSubmit = (form) => {
    const email = form.emailAddress.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Check ${email} for a reset link!`, 'success');
        redirect('/login');
      }
    });
  };

  return (
    <Styles.StyledRecoverPassword>
      <Row>
        <Col xs={12}>
          <h4 className="page-header">Recover Password</h4>
          <Alert variant="info">
            Enter your email address below to receive a link to reset your password.
          </Alert>
          <Validation
            rules={{
              emailAddress: {
                required: true,
                email: true,
              },
            }}
            messages={{
              emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address correct?',
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
                />
              </Form.Group>
              <Button type="submit" variant="success" block>
                Recover Password
              </Button>
              <AccountPageFooter>
                <p>
                  {'Remember your password? '}
                  <Link to="/login">Log In</Link>.
                </p>
              </AccountPageFooter>
            </form>
          </Validation>
        </Col>
      </Row>
    </Styles.StyledRecoverPassword>
  );
};

export default RecoverPassword;
