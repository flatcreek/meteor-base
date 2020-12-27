import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';

import AccountPageFooter from '../../components/AccountPageFooter';
import DeleteAccount from '../../components/DeleteAccount';
import ExportUserData from '../../components/ExportUserData';
import ProfileForm from '../../components/ProfileForm';
import UserSettings from '../../components/UserSettings';
import { user as GET_USER } from '../../queries/Users.gql';
import { updateUser as UPDATE_USER } from '../../mutations/Users.gql';
import Styles from './styles';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { data } = useQuery(GET_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  if (data && data.user) {
    const thisUser = data && data.user;
    return (
      <Styles.Profile>
        <h4 className="page-header">
          {thisUser.name ? `${thisUser.name.first} ${thisUser.name.last}` : thisUser.username}
        </h4>
        <Tabs
          animation={false}
          activeKey={activeTab}
          onSelect={(newTab) => setActiveTab(newTab)}
          id="admin-user-tabs"
        >
          <Tab eventKey="profile" title="Profile">
            <Row>
              <Col xs={12} sm={6} md={4}>
                <ProfileForm user={data} />
                <AccountPageFooter>
                  <ExportUserData />
                </AccountPageFooter>
                <AccountPageFooter>
                  <DeleteAccount />
                </AccountPageFooter>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <UserSettings settings={thisUser.settings} updateUser={updateUser} />
          </Tab>
        </Tabs>
      </Styles.Profile>
    );
  }
  return null;
};

export default Profile;
