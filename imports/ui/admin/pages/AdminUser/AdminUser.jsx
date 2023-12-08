import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

import AdminPageHeader from '../../components/AdminPageHeader';
import AdminUserProfile from '../../components/AdminUserProfile';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import Styles from './styles';

const AdminUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isLoading = useSubscribe('user', { userId });
  const users = useFind(() => Meteor.users.find({ _id: userId }));

  const handleUpdateUser = (userObj) => {
    Meteor.callAsync('updateUser', { ...userObj })
      .then(() => {
        Bert.alert('User updated!', 'success');
      })
      .catch((error) => {
        Bert.alert(error.message, 'danger');
      });
  };

  const handleRemoveUser = () => {
    Meteor.callAsync('removeUser', { userId })
      .then(() => {
        Bert.alert('User deleted!', 'success');
        history.push('/admin/users');
      })
      .catch((error) => {
        Bert.alert(error.message, 'danger');
      });
  };

  const handleReturnToList = () => {
    navigate('/admin/users');
  };

  // Function to format an array of badges to send to the admin header.
  // Set parameter for AdminPageHeader as badges={headerBadges()}
  const headerBadges = (thisUser) => {
    const { roles } = thisUser || {};
    // eslint-disable-next-line no-underscore-dangle
    const userRoles = roles && roles.__global_roles__;
    console.log('AdminUser.userRoles:');
    console.log(userRoles);
    return userRoles;
  };

  if (isLoading()) {
    return <Loading />;
  }

  console.log('AdminUser.user:');
  console.log(users);

  if (users && users.length > 0) {
    const user = users[0];
    const { profile, emails } = user;
    const { firstName, lastName } = profile || {};
    const emailAddress = emails[0].address;

    return (
      <Styles.AdminUser>
        <Breadcrumb>
          <LinkContainer to="/admin/users">
            <Breadcrumb.Item href="#">Users</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>
            {profile ? `${firstName} ${lastName}` : emailAddress}
          </Breadcrumb.Item>
        </Breadcrumb>
        <AdminPageHeader
          title={profile ? `${firstName} ${lastName}` : emailAddress}
          badges={headerBadges(user)}
        />
        <Tabs>
          <Tab eventKey="profile" title="Profile">
            <AdminUserProfile
              user={user}
              updateUser={handleUpdateUser}
              removeUser={handleRemoveUser}
            />
          </Tab>
        </Tabs>
      </Styles.AdminUser>
    );
  }

  return (
    <BlankState
      icon={{ color: 'warning', symbol: 'frown' }}
      title="No user here, boss."
      subtitle="This user has been removed."
      action={{
        style: 'success',
        onClick: () => handleReturnToList(),
        label: 'Return to user list',
      }}
    />
  );
};

export default AdminUser;
