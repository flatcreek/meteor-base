import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/Authentication';
import NavigationAuthenticated from '../NavigationAuthenticated';
import NavigationPublic from '../NavigationPublic';
import Styles from './styles';

const Navigation = () => {
  const { userId, loading } = useContext(AuthContext);
  const { productName } = Meteor.settings.public;
  if (!loading) {
    return (
      <Styles.Navbar>
        <Container>
          <Navbar bg="light" variant="light" expand="md">
            <Navbar.Brand>
              <Link to="/">{productName}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              {!userId ? <NavigationPublic /> : <NavigationAuthenticated />}
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Styles.Navbar>
    );
  }

  return null;
};

export default Navigation;
