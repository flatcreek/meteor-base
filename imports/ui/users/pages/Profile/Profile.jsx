import React from 'react';
import { useQuery } from '@apollo/client';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';

import AccountPageFooter from '../../components/AccountPageFooter';
import ExportUserData from '../../components/ExportUserData';
import ProfileForm from '../../components/ProfileForm';
import { user as GET_USER } from '../../queries/Users.gql';
import Styles from './styles';

const Profile = () => {
  const { data } = useQuery(GET_USER);

  if (data && data.user) {
    const thisUser = data && data.user;
    return (
      <Styles.Profile>
        <h4 className="page-header">
          {thisUser.name ? `${thisUser.name.first} ${thisUser.name.last}` : thisUser.username}
        </h4>
        <Tabs>
          <Tab eventKey="profile" title="Profile">
            <Row>
              <Col xs={12} sm={6} md={4}>
                <ProfileForm user={data} />
                <AccountPageFooter>
                  <ExportUserData />
                </AccountPageFooter>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Styles.Profile>
    );
  }
  return null;
};

export default Profile;
