import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect, useLocation } from 'react-router-dom';

import { AuthContext } from '../../global/context/Authentication';

const NoSidebar = (props) => {
  const { isInRole, userId } = useContext(AuthContext);
  const { allowedRoles, authRequired, isPublic, main } = props;
  const reqRole = allowedRoles && allowedRoles.length > 0;

  const location = useLocation();

  // If the user should be logged in, and they are not logged in -- redirect to the login page
  if (authRequired && !userId) {
    return <Redirect to={`/login${`?redirect=${location.pathname}` || ''}`} />;
  }

  // If this is a public page and the user is logged in -- redirect to the index page
  if (isPublic && userId) {
    return <Redirect to="/" />;
  }

  // If this page requires a role, check that the user is in that role
  if (authRequired && userId && reqRole) {
    const hasRole = isInRole(allowedRoles);
    if (!hasRole) {
      return <Redirect to="/" />;
    }
  }

  // Otherwise -- show the page
  return (
    <Container className="mt-4">
      <Row>
        <Col id="main-content" md={12}>
          {React.createElement(main, { ...props })}
        </Col>
      </Row>
    </Container>
  );
};

NoSidebar.defaultProps = {
  allowedRoles: null,
  authRequired: false,
  isPublic: false,
};

NoSidebar.propTypes = {
  allowedRoles: PropTypes.array,
  authRequired: PropTypes.bool,
  isPublic: PropTypes.bool,
  main: PropTypes.func.isRequired,
};

export default NoSidebar;
