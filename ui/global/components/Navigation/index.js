import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { Navbar } from 'react-bootstrap';
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
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">{productName}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {!userId ? <NavigationPublic /> : <NavigationAuthenticated />}
          </Navbar.Collapse>
        </Navbar>
      </Styles.Navbar>
    );
  }

  return null;
};

export default Navigation;
