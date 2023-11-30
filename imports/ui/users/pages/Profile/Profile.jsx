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
  const data = useFind(() => Meteor.users.find({ _id: userId }));

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
