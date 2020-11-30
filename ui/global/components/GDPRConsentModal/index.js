/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { graphql } from '@apollo/client/react/hoc';
import flowRight from 'lodash/flowRight';

import unfreezeApolloCacheValue from '../../../../modules/unfreezeApolloCacheValue';
import { userSettings as GET_USERSETTINGS } from '../../../users/queries/Users.gql';
import { updateUser as UPDATE_USER } from '../../../users/mutations/Users.gql';
import UserSettings from '../../../users/components/UserSettings';
import Styles from './styles';

class GDPRConsentModal extends React.Component {
  constructor() {
    super();
    this.state = { show: false };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.user && nextProps.data.user.settings) {
      let gdprComplete = true;
      const gdprSettings = nextProps.data.user.settings.filter(
        (setting) => setting.isGDPR === true,
      );
      gdprSettings.forEach(({ lastUpdatedByUser }) => {
        if (!lastUpdatedByUser) gdprComplete = false;
      });
      this.setState({ show: !gdprComplete });
    }
  }

  handleSaveSettings = () => {
    const { data } = this.props;
    if (data && data.user && data.user.settings) {
      this.props.updateUser({
        variables: {
          user: {
            settings: unfreezeApolloCacheValue(data && data.user && data.user.settings).map(
              (setting) => {
                const settingToUpdate = setting;
                settingToUpdate.lastUpdatedByUser = new Date().toISOString();
                return settingToUpdate;
              },
            ),
          },
        },
        refetchQueries: [{ query: GET_USERSETTINGS }],
      });
    }
  };

  render() {
    const { data, updateUser } = this.props;
    return (
      <div className="GDPRConsentModal" keyboard={false}>
        <Styles.GDPRConsentModal
          backdrop="static"
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header>
            <h4>GDPR Consent</h4>
          </Modal.Header>
          <Modal.Body>
            <p>
              In cooperation with the European Union&apos;s (EU){' '}
              <a href="https://www.eugdpr.org/" target="_blank" rel="noopener noreferrer">
                General Data Protection Regulation
              </a>{' '}
              (GDPR), we need to obtain your consent for how we make use of your data. Please review
              each of the settings below to customize your experience.
            </p>
            <UserSettings settings={data.user && data.user.settings} updateUser={updateUser} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="success"
              onClick={() => {
                this.handleSaveSettings();
                this.setState({ show: false });
              }}
            >
              Save Settings
            </Button>
          </Modal.Footer>
        </Styles.GDPRConsentModal>
      </div>
    );
  }
}

GDPRConsentModal.propTypes = {
  data: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default flowRight(
  graphql(GET_USERSETTINGS),
  graphql(UPDATE_USER, {
    name: 'updateUser',
  }),
)(GDPRConsentModal);
