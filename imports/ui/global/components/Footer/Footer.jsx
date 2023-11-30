import React from 'react';
import { Meteor } from 'meteor/meteor';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav } from 'react-bootstrap';

import { year } from '../../../../../modules/dates';
// import Styles from './styles';

const { productName, copyrightStartYear } = Meteor.settings.public;
const copyrightYear = () => {
  const currentYear = year();
  return currentYear === copyrightStartYear
    ? copyrightStartYear
    : `${copyrightStartYear}-${currentYear}`;
};

const Footer = () => (
  <Navbar expand variant="light" bg="light" fixed="bottom">
    <Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Navbar.Text>
            &copy; {copyrightYear()} {productName}
          </Navbar.Text>
        </Nav>
        <Nav>
          <LinkContainer to="/terms">
            <Nav.Link active={false}>Terms</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/privacy">
            <Nav.Link active={false}>Privacy</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Footer;
