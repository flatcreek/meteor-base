import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

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
  const [activeTab, setActiveTab] = useState('profile');
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

  if (redirect) {
    return <Redirect push to="/admin/users" />;
  }

  if (loading) return <Loading />;

  return user ? (
    <div className="AdminUser">
      <Breadcrumb>
        <LinkContainer to="/admin/users">
          <Breadcrumb.Item href="#">Users</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{name ? `${name.first} ${name.last}` : username}</Breadcrumb.Item>
      </Breadcrumb>
      <Styles.AdminUserHeader className="page-header">
        {name ? `${name.first} ${name.last}` : username}
        {user.oAuthProvider && (
          <span className={`label label-${user.oAuthProvider}`}>{user.oAuthProvider}</span>
        )}
      </Styles.AdminUserHeader>
      <Tabs
        activeKey={activeTab}
        defaultActiveKey="profile"
        onSelect={(selectedTab) => setActiveTab(selectedTab)}
        id="admin-user-tabs"
      >
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
    </div>
  ) : (
    <BlankState
      icon={{ style: 'solid', symbol: 'gear' }}
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
