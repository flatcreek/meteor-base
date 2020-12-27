import React, { Children, cloneElement, Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import validate from '../../../../modules/validate';

const Validation = ({ children, ...rest }) => {
  console.log('Validation starting');
  console.log(children);
  console.log({ ...rest });
  const formRef = useRef();

  useEffect(() => {
    validate(formRef, { ...rest });
  }, []);

  if (!Children.only(children) || children.type !== 'form') {
    console.warn(
      '[Pup] A single <form></form> element is the only allowed child of the Validation component.',
    );
    return null;
  }

  return <Fragment>{cloneElement(children, { ref: formRef })}</Fragment>;
};

Validation.propTypes = {
  children: PropTypes.node.isRequired,
  messages: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
};

export default Validation;
