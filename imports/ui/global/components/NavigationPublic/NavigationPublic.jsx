import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

const NavigationPublic = () => (
  <Nav>
    <LinkContainer to="/signup">
      <Nav.Link active={false}>Sign Up</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/login">
      <Nav.Link active={false}>Log In</Nav.Link>
    </LinkContainer>
  </Nav>
);

export default NavigationPublic;
