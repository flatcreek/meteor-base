import React, { Fragment, useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown } from 'react-bootstrap';

import { AuthContext } from '../../context/Authentication';

const NavigationAuthenticated = () => {
  const { emailAddress, isInRole, firstName, lastName } = useContext(AuthContext);

  const userName = () => {
    if (firstName) {
      return `${firstName} ${lastName}`;
    }
    return emailAddress;
  };

  return (
    <Fragment>
      <Nav className="mr-auto">
        <LinkContainer to="/documents">
          <Nav.Link>Documents</Nav.Link>
        </LinkContainer>
        {isInRole('admin') && (
          <NavDropdown title="Admin" id="admin-nav-dropdown">
            <LinkContainer exact to="/admin/users">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        )}
      </Nav>
      <Nav>
        <NavDropdown title={userName()} data-test="user-nav-dropdown" id="user-nav-dropdown">
          <LinkContainer to="/profile">
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to="/logout">
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Fragment>
  );
};

export default NavigationAuthenticated;
