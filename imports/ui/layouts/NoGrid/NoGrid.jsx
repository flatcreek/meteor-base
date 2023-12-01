import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { redirect, useLocation } from 'react-router-dom';

import { AuthContext } from '../../global/context/Authentication';

const NoGrid = (props) => {
  const { isInRole, userId } = useContext(AuthContext);
  const { allowedRoles, authRequired, isPublic, main } = props;

  const location = useLocation();

  // If the user should be logged in, and they are not logged in -- redirect to the login page
  if (authRequired && !userId) {
    return redirect(`/login${`?redirect=${location.pathname}` || ''}`);
  }

  // If this is a public page and the user is logged in -- redirect to the index page
  if (isPublic && userId) {
    return redirect('/');
  }

  // If this page requires a role, check that the user is in that role
  if (authRequired && userId && allowedRoles.length) {
    const hasRole = isInRole(allowedRoles);
    if (!hasRole) {
      return redirect('/');
    }
  }

  // Otherwise -- show the page
  return <Fragment>{React.createElement(main, { ...props })}</Fragment>;
};

NoGrid.defaultProps = {
  allowedRoles: null,
  authRequired: false,
  isPublic: false,
};

NoGrid.propTypes = {
  allowedRoles: PropTypes.array,
  authRequired: PropTypes.bool,
  isPublic: PropTypes.bool,
  main: PropTypes.func.isRequired,
};

export default NoGrid;
