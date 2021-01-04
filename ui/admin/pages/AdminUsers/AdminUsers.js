import React, { useState } from 'react';

import SearchInput from '../../../global/components/SearchInput';
import AdminUsersList from '../../components/AdminUsersList';
import Styles from './styles';

const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
        currentPage={currentPage}
        perPage={10}
        onChangePage={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default AdminUsers;
