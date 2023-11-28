import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

import AdminPageHeader from '../../components/AdminPageHeader';
import AdminUserProfile from '../../components/AdminUserProfile';
import BlankState from '../../../global/components/BlankState';
import Loading from '../../../global/components/Loading';
import UserSettings from '../../../users/components/UserSettings';
import { user as GET_USER } from '../../../users/queries/Users.gql';
import {
  updateUser as UPDATE_USER,
  removeUser as REMOVE_USER,
} from '../../../users/mutations/Users.gql';
import { users as GET_USERS } from '../../queries/Admin.gql';
import Styles from './styles';

const AdminUser = () => {
  const [redirect, setRedirect] = useState(false);
  const { _id } = useParams();
  const history = useHistory();
  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { _id },
    fetchPolicy: 'no-cache',
  });

  const user = data && data.user;

  const name = user && user.name;
  const username = user && user.username;

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USER, variables: { _id } }],
    onCompleted: () => {
      Bert.alert('User updated!', 'success');
    },
    onError: (error) => {
      Bert.alert(error.message, 'danger');
    },
  });

  const [removeUser] = useMutation(REMOVE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      Bert.alert('User deleted!', 'success');
      history.push('/admin/users');
    },
    onError: (error) => {
      Bert.alert(error.message, 'danger');
    },
  });

  const handleUpdateUser = (userObj) => {
    updateUser({ variables: { user: userObj } }).then(() => {
      refetch();
    });
  };

  const handleRemoveUser = () => {
    removeUser({
      variables: { _id },
    });
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

  if (redirect) {
    return <Redirect push to="/admin/users" />;
  }

  if (loading) return <Loading />;

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
          <Tab eventKey="settings" title="Settings">
            <UserSettings
              isAdmin
              userId={user._id}
              settings={user.settings}
              updateUser={updateUser}
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
        onClick: () => setRedirect({ redirect: true }),
        label: 'Return to user list',
      }}
    />
  );
};

export default AdminUser;
