import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/Authentication';
import NavigationAuthenticated from '../NavigationAuthenticated';
import NavigationPublic from '../NavigationPublic';
import Styles from './styles';

const Navigation = () => {
  const { userId } = useContext(AuthContext);
  const { productName } = Meteor.settings.public;
  return (
    <Styles.StyledNavbar bg="light" variant="light" expand="md">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            {productName}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {!userId ? <NavigationPublic /> : <NavigationAuthenticated />}
        </Navbar.Collapse>
      </Container>
    </Styles.StyledNavbar>
  );
};

export default Navigation;
