import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Styles from './styles';

/**
 *
 * @param {String} icon.color returns a global color style for this icon (primary, success, danger, etc)
 * @param {String} icon.symbol returns a FontAwesome symbol code without the 'fa-' preface
 */

const BlankState = ({ image, icon, title, subtitle, action }) => (
  <Styles.BlankState iconColor={icon.color}>
    {image && <img src={image} alt={title} />}
    {icon && <FontAwesomeIcon icon={icon.symbol} size="10x" />}
    <h4>{title}</h4>
    {subtitle && <p>{subtitle}</p>}
    {action && (
      <Button variant={action.style || 'success'} onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </Styles.BlankState>
);

BlankState.defaultProps = {
  image: null,
  icon: null,
  action: null,
  subtitle: null,
};

BlankState.propTypes = {
  image: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.object,
};

export default BlankState;
