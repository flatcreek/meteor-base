import React from 'react';
import { Meteor } from 'meteor/meteor';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav } from 'react-bootstrap';

import { year } from '../../../../modules/dates';
// import Styles from './styles';

const { productName, copyrightStartYear } = Meteor.settings.public;
const copyrightYear = () => {
  const currentYear = year();
  return currentYear === copyrightStartYear
    ? copyrightStartYear
    : `${copyrightStartYear}-${currentYear}`;
};

const Footer = () => (
  <footer className="footer mt-auto pt-3">
    <Navbar expand="lg" variant="light" bg="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container>
          <Nav className="mr-auto">
            <Navbar.Text>
              &copy; {copyrightYear()} {productName}
            </Navbar.Text>
          </Nav>
          <Nav>
            <LinkContainer to="/terms">
              <Nav.Link>Terms</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/privacy">
              <Nav.Link>Privacy</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  </footer>
);

export default Footer;
