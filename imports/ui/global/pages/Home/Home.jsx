import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import Styles from './styles';

const Home = () => (
  <Styles.Home>
    <Container>
      <div className="p-5 my-4 bg-light rounded-3">
        <div className="py-5 justify-content-md-center">
          <h1 className="display-5 fw-bold">Hello, world!</h1>
          <p className="col-md-8 fs-4">
            This is a simple hero unit, a simple jumbotron-style component for calling extra
            attention to featured content or information.
          </p>
          <Button variant="primary" size="lg">
            Learn more
          </Button>
        </div>
      </div>
    </Container>
    <Container className="mt-4">
      <Row>
        <Col>
          <div className="text-center">Column #1</div>
        </Col>
        <Col>
          <div className="text-center">Column #2</div>
        </Col>
        <Col>
          <div className="text-center">Column #3</div>
        </Col>
      </Row>
    </Container>
  </Styles.Home>
);

export default Home;
