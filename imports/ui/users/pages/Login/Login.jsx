import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import LoginForm from '../../components/LoginForm/LoginForm';

const Login = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
