import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { Bert } from 'meteor/themeteorchef:bert';

import BlankState from '../../../global/components/BlankState';
import GET_USERSETTINGS from '../../../users/queries/UserSettings.gql';
import {
  addUserSetting as ADD_USERSETTING,
  updateUserSetting as UPDATE_USERSETTING,
  removeUserSetting as REMOVE_USERSETTING,
} from '../../../users/mutations/UserSettings.gql';
import AdminUserSettingsModal from '../../components/AdminUserSettingsModal';
import Styles from './styles';

const AdminUserSettings = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentSetting, setCurrentSetting] = useState(null);
  const { data } = useQuery(GET_USERSETTINGS);

  const [addUserSetting] = useMutation(ADD_USERSETTING, {
    refetchQueries: [{ query: GET_USERSETTINGS }],
    onCompleted: () => {
      Bert.alert('Setting added!', 'success');
    },
  });

  const [updateUserSetting] = useMutation(UPDATE_USERSETTING, {
    refetchQueries: [{ query: GET_USERSETTINGS }],
    onCompleted: () => {
      Bert.alert('Setting updated!', 'success');
    },
  });

  const [removeUserSetting] = useMutation(REMOVE_USERSETTING, {
    refetchQueries: [{ query: GET_USERSETTINGS }],
    onCompleted: () => {
      Bert.alert('Setting removed!', 'success');
    },
  });

  const handleDeleteSetting = (settingId) => {
    if (
      confirm(
        "Are you sure? Before deleting this setting make sure that it's no longer in use in your application!",
      )
    ) {
      removeUserSetting({
        variables: {
          _id: settingId,
        },
      });
    }
  };

  const handleAddSetting = () => {
    setShowSettingsModal(true);
    setCurrentSetting(null);
  };

  const handleEditSetting = (setting) => {
    setShowSettingsModal(true);
    setCurrentSetting(setting);
  };

  const handleHideModal = () => {
    setShowSettingsModal(false);
    setCurrentSetting(null);
  };

  return (
    <div className="AdminUserSettings">
      <div className="page-header clearfix">
        <h4 className="pull-left">User Settings</h4>
        <Button variant="success" className="pull-right" onClick={() => handleAddSetting()}>
          Add Setting
        </Button>
      </div>
      {data && data.userSettings && data.userSettings.length > 0 ? (
        <ListGroup>
          {data.userSettings.map((setting) => (
            <Styles.Setting key={setting._id}>
              <p>{setting.label}</p>
              <div>
                <Button variant="outline-dark" onClick={() => handleEditSetting(setting)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteSetting(setting._id)}>
                  Delete
                </Button>
              </div>
            </Styles.Setting>
          ))}
        </ListGroup>
      ) : (
        <BlankState
          icon={{ symbol: 'cogs' }}
          title="No user settings here, friend."
          subtitle="Add your first setting by clicking the button below."
          action={{
            style: 'success',
            onClick: () => handleAddSetting(),
            label: 'Create Your First Setting',
          }}
        />
      )}
      <AdminUserSettingsModal
        show={showSettingsModal}
        onHide={() => handleHideModal()}
        setting={currentSetting}
        addUserSetting={addUserSetting}
        updateUserSetting={updateUserSetting}
      />
    </div>
  );
};

export default AdminUserSettings;
