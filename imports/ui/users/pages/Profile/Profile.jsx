import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';

import AccountPageFooter from '../../components/AccountPageFooter';
import ExportUserData from '../../components/ExportUserData';
import ProfileForm from '../../components/ProfileForm';
import Styles from './styles';

const Profile = () => {
  useSubscribe('user');
  const userId = Meteor.userId();
  const user = useFind(() => Meteor.users.find({ _id: userId }));

  if (user) {
    const { profile, emails } = user || {};
    const { firstName, lastName } = profile || {};
    const emailAddress = emails[0].address;

    return (
      <Styles.Profile>
        <h4 className="page-header">{profile ? `${firstName} ${lastName}` : emailAddress}</h4>
        <Tabs>
          <Tab eventKey="profile" title="Profile">
            <Row>
              <Col xs={12} sm={6} md={4}>
                <ProfileForm user={user} />
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
