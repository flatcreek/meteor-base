import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Styles from './styles';

const ToggleSwitch = (props) => {
  const { id, onLabel, offLabel, onToggle, toggled } = props;
  const [isToggled, setIsToggled] = useState(toggled);

  const toggleSwitch = (event) => {
    event.stopPropagation();
    setIsToggled(!isToggled);
    if (onToggle) {
      onToggle(id, !isToggled);
    }
  };

  return (
    <Styles.ToggleSwitch className="ToggleSwitch" toggled={isToggled} onClick={toggleSwitch}>
      <div className="handle">
        <span className="handle-label">
          {isToggled
            ? onLabel || <FontAwesomeIcon icon="check" />
            : offLabel || <FontAwesomeIcon icon="times" />}
        </span>
      </div>
    </Styles.ToggleSwitch>
  );
};

ToggleSwitch.defaultProps = {
  id: '',
  toggled: false,
  onLabel: '',
  offLabel: '',
  onToggle: null,
};

ToggleSwitch.propTypes = {
  id: PropTypes.string,
  offLabel: PropTypes.string,
  onLabel: PropTypes.string,
  onToggle: PropTypes.func,
  toggled: PropTypes.bool,
};

export default ToggleSwitch;
