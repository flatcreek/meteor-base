import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect, useLocation } from 'react-router-dom';

import Sidebar from '../../global/components/Sidebar';
import { AuthContext } from '../../global/context/Authentication';

const WithSidebar = (props) => {
  const { userId } = useContext(AuthContext);
  const { authRequired, isPublic, main } = props;

  const location = useLocation();

  // If the user should be logged in, and they are not logged in -- redirect to the login page
  if (authRequired && !userId) {
    return <Redirect to={`/login${`?redirect=${location.pathname}` || ''}`} />;
  }

  // If this is a public page and the user is logged in -- redirect to the index page
  if (isPublic && userId) {
    return <Redirect to="/" />;
  }

  // Otherwise -- show the page
  return (
    <Container className="mt-4">
      <Row>
        <Col id="main-content" md={9}>
          {React.createElement(main, { ...props })}
        </Col>
        <Col md={3} xsHidden smHidden>
          <Sidebar />
        </Col>
      </Row>
    </Container>
  );
};

WithSidebar.defaultProps = {
  authRequired: false,
  isPublic: false,
};

WithSidebar.propTypes = {
  authRequired: PropTypes.bool,
  isPublic: PropTypes.bool,
  main: PropTypes.func.isRequired,
};

export default WithSidebar;
