import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Styles from './styles';

const Home = () => (
  <Styles.Home>
    <Jumbotron fluid>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling extra
              attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
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
