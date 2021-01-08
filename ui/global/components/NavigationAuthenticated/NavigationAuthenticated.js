import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown } from 'react-bootstrap';

import { AuthContext } from '../../context/Authentication';

const NavigationAuthenticated = () => {
  const history = useHistory();
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
          <Nav.Link href="/documents">Documents</Nav.Link>
        </LinkContainer>
        {isInRole('admin') && (
          <NavDropdown title="Admin" id="admin-nav-dropdown">
            <LinkContainer exact to="/admin/users">
              <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer exact to="/admin/users/settings">
              <NavDropdown.Item href="/admin/users/settings">User Settings</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        )}
      </Nav>
      <Nav>
        <NavDropdown title={userName()} data-test="user-nav-dropdown" id="user-nav-dropdown">
          <LinkContainer to="/profile">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => history.push('/logout')}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Fragment>
  );
};

export default NavigationAuthenticated;
