/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';

import ToggleSwitch from '../../../global/components/ToggleSwitch';
import BlankState from '../../../global/components/BlankState';
import Styles from './styles';

const UserSettings = (props) => {
  const { isAdmin, settings, updateUser, userId } = props;
  const [settingsValues, setSettingsValues] = useState(null);
  const [inSave, setInSave] = useState(false);

  useEffect(() => {
    if (settings) {
      setSettingsValues(settings);
    }
  }, []);

  useEffect(() => {
    if (inSave) {
      updateUser({
        variables: {
          user: {
            _id: userId,
            settings: settingsValues,
          },
        },
      }).then(() => {
        setInSave(false);
        Bert.alert('User updated!', 'success');
      });
    }
  }, [inSave]);

  const handleUpdateSetting = (setting) => {
    let currentSettings = settings;
    let updatedSetting = setting;

    let { _id, value } = updatedSetting;
    let updatedSettingIndex = currentSettings.findIndex((obj) => obj._id === _id);
    const updatedObj = { ...currentSettings[updatedSettingIndex], value };

    const updatedSettings = [
      ...currentSettings.slice(0, updatedSettingIndex),
      updatedObj,
      ...currentSettings.slice(updatedSettingIndex + 1),
    ];

    setSettingsValues(updatedSettings);
  };

  const handleSubmit = () => {
    setInSave(true);
  };

  const renderSettingValue = (type, key, value, onChange) => {
    if (type === 'boolean') {
      return (
        <ToggleSwitch
          id={key}
          toggled={value === 'true'}
          onToggle={(_id, toggled) => onChange({ key, value: `${toggled}` })}
        />
      );
    }

    if (type === 'number') {
      return (
        <input
          type="number"
          className="form-control"
          value={value}
          onChange={(event) => onChange({ key, value: parseInt(event.target.value, 10) })}
        />
      );
    }

    return (
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(event) => onChange({ key, value: event.target.value })}
      />
    );
  };

  if (settingsValues && settingsValues.length > 0) {
    return (
      <div className="UserSettings">
        <ListGroup>
          {settingsValues.map(({ _id, key, label, type, value }) => (
            <Styles.Setting key={key} className="clearfix">
              <p>{label}</p>
              <div>
                {renderSettingValue(type, key, value, (update) =>
                  handleUpdateSetting({ ...update, _id }),
                )}
              </div>
            </Styles.Setting>
          ))}
        </ListGroup>
        <Button bsStyle="primary" onClick={() => handleSubmit()}>
          Save changes
        </Button>
      </div>
    );
  }

  return (
    <div className="UserSettings">
      <ListGroup>
        <BlankState
          icon={{ style: 'solid', symbol: 'cogs' }}
          title={`No settings to manage ${isAdmin ? 'for this user' : 'yet'}.`}
          subtitle={`${
            isAdmin ? 'GDPR-specific settings intentionally excluded. ' : ''
          } When there are settings to manage, they'll appear here.`}
        />
      </ListGroup>
    </div>
  );
};

UserSettings.defaultProps = {
  isAdmin: false,
  settings: [],
  updateUser: null,
  userId: null,
};

UserSettings.propTypes = {
  isAdmin: PropTypes.bool,
  settings: PropTypes.array,
  updateUser: PropTypes.func,
  userId: PropTypes.string,
};

export default UserSettings;
