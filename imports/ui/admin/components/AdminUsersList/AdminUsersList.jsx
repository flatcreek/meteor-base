/* eslint-disable jsx-a11y/anchor-is-valid */
import { Meteor } from 'meteor/meteor';
import React, { Fragment, useEffect, useState } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import Loading from '../../../global/components/Loading';
import Pagination from '../../../global/components/Pagination';
import Styles from './styles';

const AdminUsersList = (props) => {
  const { limit, skip, onChangePage, search } = props;
  const [pageCount, setPageCount] = useState(1);
  const isLoading = useSubscribe('users', {
    limit,
    skip,
    search,
  });
  const users = useFind(() => Meteor.users.find());

  useEffect(() => {
    Meteor.callAsync('getUserCount').then((response) => {
      console.log('itemCount', response);
      console.log('limit', limit);
      const pagesToGenerate = Math.ceil(response / limit);
      console.log('pagesToGenerate', pagesToGenerate);
      setPageCount(pagesToGenerate);
    });
  }, []);

  console.log('AdminUsersList.users:');
  console.log('loading', isLoading());
  console.log(users);

  const renderPagination = () => {
    const pages = [];
    const pagesToGenerate = Math.ceil(users.total / limit);

    for (let pageNumber = 1; pageNumber <= pagesToGenerate; pageNumber += 1) {
      pages.push(
        <li
          role="presentation"
          key={`pagination_${pageNumber}`}
          className={pageNumber === skip ? 'active' : ''}
          onClick={() => onChangePage(pageNumber)}
          onKeyDown={() => onChangePage(pageNumber)}
        >
          <a href="#" onClick={(event) => event.preventDefault()}>
            {pageNumber}
          </a>
        </li>,
      );
    }

    return <ul className="pagination pagination-md">{pages}</ul>;
  };

  if (isLoading()) {
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
      <Pagination pages={pageCount} />
    </Fragment>
  );
};

AdminUsersList.defaultProps = {
  search: '',
};

AdminUsersList.propTypes = {
  search: PropTypes.string,
  limit: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default AdminUsersList;
