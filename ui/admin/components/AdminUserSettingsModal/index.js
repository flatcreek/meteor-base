import React, { useEffect, useReducer, useRef, useState } from 'react';
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

const init = (setting) => {
  if (setting) {
    return { ...setting };
  }
  return { ...defaultState };
};

const reducer = (state, action) => {
  // eslint-disable-next-line prefer-const
  let { field, value } = action;
  if (action.initialize) {
    return init(action.payload);
  }
  if (field === 'key') {
    value = camelCase(value);
  }
  if (field === 'value' && state.type === 'number') {
    value = value ? parseInt(value, 10) : '';
  }
  return {
    ...state,
    [field]: value,
  };
};

const AdminUserSettingsModal = (props) => {
  const { addUserSetting, show, onHide, setting, updateUserSetting } = props;
  const formRef = useRef();
  const [inSubmit, setInSubmit] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState, init);

  const { isGDPR, key, label, type, value } = state;

  useEffect(() => {
    if (setting) {
      dispatch({ initialize: true, payload: setting });
    }
  }, [setting]);

  useEffect(() => {
    if (inSubmit) {
      const mutation = setting ? updateUserSetting : addUserSetting;
      const settingToAddOrUpdate = {
        isGDPR,
        key: key.trim(),
        label: label.trim(),
        type,
        value: value.toString(),
      };

      if (setting) {
        settingToAddOrUpdate._id = setting._id;
        const confirmUpdate = confirm(
          "Are you sure? This will overwrite this setting for all users immediately. If you're changing the Key Name or Type, double-check that your UI can support this to avoid rendering errors.",
        );
        if (!confirmUpdate) return;
      }

      mutation({
        variables: {
          setting: settingToAddOrUpdate,
        },
      })
        .then(() => {
          setInSubmit(false);
          dispatch({ initialize: true });
          onHide();
        })
        .catch((error) => {
          console.warn('AdminUserSetting mutation error');
          console.warn(error);
        });
    }
  }, [inSubmit]);

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const handleChangeToggle = (toggled) => {
    dispatch({ field: 'isGDPR', value: toggled });
  };

  const handleSubmit = () => {
    setInSubmit(true);
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
                    value={key}
                    onChange={handleChange}
                    placeholder="canWeSendYouMarketingEmails"
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <ControlLabel>Is this a GDPR setting?</ControlLabel>
                  <ToggleSwitch
                    toggled={isGDPR}
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
                value={label}
                onChange={handleChange}
                placeholder="Can we send you marketing emails?"
              />
              <InputHint>This is what users will see in their settings panel.</InputHint>
            </FormGroup>
            <Row>
              <Col xs={12} sm={6}>
                <ControlLabel>Type</ControlLabel>
                <select name="type" value={type} onChange={handleChange} className="form-control">
                  <option value="boolean">Boolean (true/false)</option>
                  <option value="number">Number</option>
                  <option value="string">String</option>
                </select>
              </Col>
              <Col xs={12} sm={6}>
                <ControlLabel>Default Value</ControlLabel>
                {type === 'boolean' && (
                  <select
                    name="value"
                    value={value}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                )}
                {type === 'number' && (
                  <input
                    type="number"
                    name="value"
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                    placeholder={5}
                  />
                )}
                {type === 'string' && (
                  <input
                    type="text"
                    name="value"
                    className="form-control"
                    value={value}
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
