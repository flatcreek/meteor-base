import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

const NavigationPublic = () => (
  <Nav>
    <LinkContainer to="/signup">
      <Nav.Link eventKey={1} href="/signup">
        Sign Up
      </Nav.Link>
    </LinkContainer>
    <LinkContainer to="/login">
      <Nav.Link eventKey={2} href="/login">
        Log In
      </Nav.Link>
    </LinkContainer>
  </Nav>
);

export default NavigationPublic;
