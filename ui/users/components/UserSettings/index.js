import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import ToggleSwitch from '../../../global/components/ToggleSwitch';
import BlankState from '../../../global/components/BlankState';
import { AuthContext } from '../../../global/context/Authentication';
// import unfreezeApolloCacheValue from '../../../../modules/unfreezeApolloCacheValue';
import delay from '../../../../modules/delay';
import Styles from './styles';

const UserSettings = (props) => {
  console.log('UserSettings:');
  console.log(props);
  const { userId } = useContext(AuthContext);
  const { isAdmin, settings, updateUser } = props;

  // constructor(props) {
  //   super(props);
  //   this.state = { settings: unfreezeApolloCacheValue([...settings]) };
  // }

  const handleUpdateSetting = (setting) => {
    const settingsUpdate = [...settings];
    const settingToUpdate = settingsUpdate.find(({ _id }) => _id === setting._id);

    settingToUpdate.value = setting.value;

    if (!userId) settingToUpdate.lastUpdatedByUser = new Date().toISOString();

    delay(() => {
      updateUser({
        variables: {
          user: {
            _id: userId,
            settings: settingsUpdate,
          },
        },
      });
    }, 750);
  };

  const renderSettingValue = (type, key, value, onChange) => {
    if (type === 'boolean') {
      return (
        <ToggleSwitch
          id={key}
          toggled={value === 'true'}
          onToggle={(id, toggled) => onChange({ key, value: `${toggled}` })}
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

  return (
    <div className="UserSettings">
      <ListGroup>
        {settings.length > 0 ? (
          settings.map(({ _id, key, label, type, value }) => (
            <Styles.Setting key={key} className="clearfix">
              <p>{label}</p>
              <div>
                {renderSettingValue(type, key, value, (update) =>
                  handleUpdateSetting({ ...update, _id }),
                )}
              </div>
            </Styles.Setting>
          ))
        ) : (
          <BlankState
            icon={{ style: 'solid', symbol: 'cogs' }}
            title={`No settings to manage ${isAdmin ? 'for this user' : 'yet'}.`}
            subtitle={`${
              isAdmin ? 'GDPR-specific settings intentionally excluded. ' : ''
            } When there are settings to manage, they'll appear here.`}
          />
        )}
      </ListGroup>
    </div>
  );
};

UserSettings.defaultProps = {
  isAdmin: false,
  settings: [],
  updateUser: null,
};

UserSettings.propTypes = {
  isAdmin: PropTypes.bool,
  settings: PropTypes.array,
  updateUser: PropTypes.func,
};

export default UserSettings;
