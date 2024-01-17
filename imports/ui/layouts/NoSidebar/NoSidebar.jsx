import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../global/context/Authentication';

const NoSidebar = (props) => {
  const { isInRole, userId } = useContext(AuthContext);
  const { allowedRoles, authRequired, isPublic, main } = props;
  const reqRole = allowedRoles && allowedRoles.length > 0;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user should be logged in, and they are not logged in -- redirect to the login page
    if (authRequired && !userId) {
      navigate(`/login${`?redirect=${location.pathname}` || ''}`);
    }

    // If this is a public page and the user is logged in -- redirect to the index page
    if (isPublic && userId) {
      navigate('/');
    }

    // If this page requires a role, check that the user is in that role
    if (authRequired && userId && reqRole) {
      const hasRole = isInRole(allowedRoles);
      if (!hasRole) {
        navigate('/');
      }
    }
  }, []);

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
