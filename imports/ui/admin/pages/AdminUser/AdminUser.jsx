import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams, redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

import AdminPageHeader from '../../components/AdminPageHeader';
import AdminUserProfile from '../../components/AdminUserProfile';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import Styles from './styles';

const AdminUser = () => {
  const { _id } = useParams();
  const isLoading = useSubscribe('user', { _id });
  const data = useFind(() => Meteor.users.find({ _id }));

  const user = data && data.user;
  const name = user && user.name;
  const username = user && user.username;

  const handleUpdateUser = (userObj) => {
    Meteor.callAsync('updateUser', { user: userObj })
      .then(() => {
        Bert.alert('User updated!', 'success');
      })
      .catch((error) => {
        Bert.alert(error.message, 'danger');
      });
  };

  const handleRemoveUser = () => {
    Meteor.callAsync('removeUser', { _id })
      .then(() => {
        Bert.alert('User deleted!', 'success');
        history.push('/admin/users');
      })
      .catch((error) => {
        Bert.alert(error.message, 'danger');
      });
  };

  const handleReturnToList = () => {
    redirect('/admin/users');
  };

  // Function to format an array of badges to send to the admin header.
  // Set parameter for AdminPageHeader as badges={headerBadges()}
  const headerBadges = () => {
    return [
      {
        label: user.oAuthProvider,
      },
    ];
  };

  if (isLoading()) return <Loading />;

  if (user) {
    return (
      <Styles.AdminUser>
        <Breadcrumb>
          <LinkContainer to="/admin/users">
            <Breadcrumb.Item href="#">Users</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>{name ? `${name.first} ${name.last}` : username}</Breadcrumb.Item>
        </Breadcrumb>
        <AdminPageHeader
          title={name ? `${name.first} ${name.last}` : username}
          badges={headerBadges()}
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
