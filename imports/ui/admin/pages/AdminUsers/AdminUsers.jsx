import React, { useState } from 'react';

import SearchInput from '../../../global/components/SearchInput';
import AdminUsersList from '../../components/AdminUsersList';
import Styles from './styles';

const AdminUsers = () => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');

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
        search={search}
        skip={skip}
        limit={10}
        onChangePage={(newPage) => setSkip(newPage)}
      />
    </div>
  );
};

export default AdminUsers;
