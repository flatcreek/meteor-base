import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';

import SearchInput from '../../../global/components/SearchInput';
import AdminUsersList from '../../components/AdminUsersList';
import Styles from './styles';

const AdminUsers = () => {
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');
  const isLoading = useSubscribe('users', {
    limit,
    skip,
    search,
  });
  const users = useFind(() => Meteor.users.find({ _id: { $ne: Meteor.userId() } }));

  const onChangePage = (value) => {
    console.log('Adminusers.onChangePage.event:');
    console.log(value);
    if (value === 0) {
      setSkip(0);
    } else {
      const newPage = parseInt(value, 10);
      console.log('AdminUsers.newSkip', newPage * limit - limit);
      setSkip(newPage * limit - limit);
    }
  };

  return (
    <div className="AdminUsers">
      <Styles.AdminUsersHeader className="page-header clearfix">
        <h4 className="pull-left">Users</h4>
        <SearchInput
          placeholder="Search users..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Styles.AdminUsersHeader>
      <AdminUsersList
        isLoading={isLoading()}
        search={search}
        skip={skip}
        limit={limit}
        onChangePage={(e) => onChangePage(e)}
        users={users}
      />
    </div>
  );
};

export default AdminUsers;
