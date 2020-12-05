import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import { camelCase } from 'lodash';

import Validation from '../../../global/components/Validation';
import InputHint from '../../../global/components/InputHint';
import ToggleSwitch from '../../../global/components/ToggleSwitch';

const defaultState = {
  isGDPR: false,
  key: '',
  label: '',
  type: 'boolean',
  value: '',
};

const AdminUserSettingsModal = (props) => {
  console.log('AdminUserSettingsModal.props');
  console.log(props);
  const { addUserSetting, show, onHide, setting, updateUserSetting } = props;
  const formRef = useRef();
  const [isGDPR, setIsGDPR] = useState(false);
  const [thisSetting, setThisSetting] = useState(defaultState);

  useEffect(() => {
    if (setting) {
      setThisSetting(setting);
    } else {
      setThisSetting(defaultState);
    }
  }, [setting]);

  useEffect(() => {
    const settingValues = thisSetting;
    settingValues.isGDPR = isGDPR;
    setThisSetting({ ...settingValues });
  }, [isGDPR]);

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    const settingValues = thisSetting;
    if (name === 'key') {
      value = camelCase(value.trim());
    }
    if (name === 'value' && settingValues.type === 'number') {
      value = value ? parseInt(value, 10) : '';
    }
    settingValues[name] = value;
    setThisSetting({ ...settingValues });
  };

  const handleChangeToggle = (toggled) => {
    setIsGDPR(toggled);
  };

  const handleSubmit = (form) => {
    const mutation = setting ? updateUserSetting : addUserSetting;
    const settingToAddOrUpdate = {
      isGDPR: thisSetting.isGDPR,
      key: form.key.value,
      label: form.label.value.trim(),
      type: form.type.value,
      value: form.value.value,
    };

    if (setting) {
      settingToAddOrUpdate._id = setting._id;
      const confirmUpdate = confirm(
        "Are you sure? This will overwrite this setting for all users immediately. If you're changing the Key Name or Type, double-check that your UI can support this to avoid rendering errors.",
      );
      if (!confirmUpdate) return;
    }

    console.log('AdminUserSettingsModal.handleSubmit.settingToAddOrUpdate:');
    console.log(settingToAddOrUpdate);

    mutation({
      variables: {
        setting: settingToAddOrUpdate,
      },
    });

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>
          {setting ? 'Edit ' : 'Add a '}
          User Setting
        </Modal.Title>
      </Modal.Header>
      <Validation
        rules={{
          keyName: {
            required: true,
          },
          label: {
            required: true,
          },
        }}
        messages={{
          keyName: {
            required: "What's a good keyName for this?",
          },
          label: {
            required: "What's a good label for this?",
          },
        }}
        submitHandler={(form) => {
          handleSubmit(form);
        }}
      >
        <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
          <Modal.Body>
            <Row>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <ControlLabel>Key Name</ControlLabel>
                  <input
                    type="text"
                    name="key"
                    className="form-control"
                    value={thisSetting.key}
                    onChange={handleChange}
                    placeholder="canWeSendYouMarketingEmails"
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <ControlLabel>Is this a GDPR setting?</ControlLabel>
                  <ToggleSwitch
                    toggled={thisSetting.isGDPR}
                    onToggle={(id, toggled) => handleChangeToggle(toggled)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <ControlLabel>Label</ControlLabel>
              <input
                type="text"
                name="label"
                className="form-control"
                value={thisSetting.label}
                onChange={handleChange}
                placeholder="Can we send you marketing emails?"
              />
              <InputHint>This is what users will see in their settings panel.</InputHint>
            </FormGroup>
            <Row>
              <Col xs={12} sm={6}>
                <ControlLabel>Type</ControlLabel>
                <select
                  name="type"
                  value={thisSetting.type}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="boolean">Boolean (true/false)</option>
                  <option value="number">Number</option>
                  <option value="string">String</option>
                </select>
              </Col>
              <Col xs={12} sm={6}>
                <ControlLabel>Default Value</ControlLabel>
                {thisSetting.type === 'boolean' && (
                  <select
                    name="value"
                    value={thisSetting.value}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                )}
                {thisSetting.type === 'number' && (
                  <input
                    type="number"
                    name="value"
                    className="form-control"
                    value={thisSetting.value}
                    onChange={handleChange}
                    placeholder={5}
                  />
                )}
                {thisSetting.type === 'string' && (
                  <input
                    type="text"
                    name="value"
                    className="form-control"
                    value={thisSetting.value}
                    onChange={handleChange}
                    placeholder="Squirrel?!"
                  />
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" bsStyle="success">
              {setting ? 'Save' : 'Add'}
              {' Setting'}
            </Button>
          </Modal.Footer>
        </form>
      </Validation>
    </Modal>
  );
};

AdminUserSettingsModal.defaultProps = {
  setting: null,
};

AdminUserSettingsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  setting: PropTypes.object,
  addUserSetting: PropTypes.func.isRequired,
  updateUserSetting: PropTypes.func.isRequired,
};

export default AdminUserSettingsModal;
