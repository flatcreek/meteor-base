import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Meteor } from 'meteor/meteor';
import { useRouteError } from 'react-router-dom';

const NotFound = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="NotFound">
      <Alert variant="danger">
        <p>
          <strong>Error [404]</strong>
          {': '}
          {Meteor.isClient ? window.location.pathname : ''}
          {' does not exist.'}
        </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </Alert>
    </div>
  );
};

export default NotFound;
