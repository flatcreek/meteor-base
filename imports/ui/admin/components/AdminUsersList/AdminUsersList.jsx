/* eslint-disable jsx-a11y/anchor-is-valid */
import { Meteor } from 'meteor/meteor';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import Loading from '../../../global/components/Loading';
import Pagination from '../../../global/components/Pagination';
import Styles from './styles';

const AdminUsersList = (props) => {
  const { isLoading, limit, skip, onChangePage, users } = props;
  const [pageCount, setPageCount] = useState(1);
  const [skipCount, setSkipCount] = useState(0);

  useEffect(() => {
    Meteor.callAsync('getUserCount').then((response) => {
      const pagesToGenerate = Math.ceil(response / limit);
      const currentPage = Math.ceil(skip / limit) + 1;
      setPageCount(pagesToGenerate);
      setSkipCount(currentPage);
    });
  }, [skip, limit]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Styles.AdminListGroup>
        {users &&
          users.map((user) => {
            const { _id: userId, emails, profile, roles } = user || {};
            const emailAddress = emails[0].address;
            const emailVerified = emails[0].verified;
            const { firstName, lastName } = profile || {};
            const name = firstName ? `${firstName} ${lastName}` : emailAddress;
            // eslint-disable-next-line no-underscore-dangle
            const roleNames = roles?.__global_roles__;
            return (
              <LinkContainer to={`/admin/users/${userId}`} key={userId}>
                <Styles.AdminListGroupItem action>
                  <div>
                    {name}
                    <span className="list-email">{emailAddress}</span>
                    {!emailVerified && (
                      <Styles.AdminLabel bg="danger">Email not verified</Styles.AdminLabel>
                    )}
                    {roleNames &&
                      roleNames.map((role) => (
                        <Styles.AdminLabel key={role} bg="info">
                          {role}
                        </Styles.AdminLabel>
                      ))}
                  </div>
                </Styles.AdminListGroupItem>
              </LinkContainer>
            );
          })}
      </Styles.AdminListGroup>
      {/* {users && users.total && search.trim() === '' && users.total > limit && renderPagination()} */}
      {pageCount > 1 && (
        <Pagination
          skipCount={skipCount}
          pageCount={pageCount}
          onChangePage={(e) => onChangePage(e)}
        />
      )}
    </Fragment>
  );
};

AdminUsersList.defaultProps = {
  isLoading: true,
  users: null,
};

AdminUsersList.propTypes = {
  isLoading: PropTypes.bool,
  limit: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  users: PropTypes.array,
};

export default AdminUsersList;
