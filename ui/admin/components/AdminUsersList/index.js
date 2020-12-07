/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Loading from '../../../global/components/Loading';
import { users as GET_USERS } from '../../queries/Admin.gql';

import Styles from './styles';

const AdminUsersList = (props) => {
  const { perPage, currentPage, onChangePage, search } = props;
  const { data, loading } = useQuery(GET_USERS, {
    variables: {
      perPage,
      currentPage,
      search,
    },
    fetchPolicy: 'no-cache',
  });

  const renderPagination = () => {
    const pages = [];
    const pagesToGenerate = Math.ceil(data.users.total / perPage);

    for (let pageNumber = 1; pageNumber <= pagesToGenerate; pageNumber += 1) {
      pages.push(
        <li
          role="presentation"
          key={`pagination_${pageNumber}`}
          className={pageNumber === currentPage ? 'active' : ''}
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

  if (loading) return <Loading />;

  return (
    <Fragment>
      <Styles.AdminListGroup>
        {data.users &&
          data.users.users &&
          data.users.users.map(
            ({ _id, emailAddress, name, username, oAuthProvider, emailVerified }) => (
              <Styles.AdminListGroupItem key={_id}>
                <Link to={`/admin/users/${_id}`} />
                <p>
                  {name ? `${name.first} ${name.last}` : username}
                  <span>{emailAddress}</span>
                  {oAuthProvider && (
                    <span className={`label label-${oAuthProvider}`}>{oAuthProvider}</span>
                  )}
                  {!emailVerified && (
                    <Styles.AdminLabel bsStyle="danger">Email not verified</Styles.AdminLabel>
                  )}
                </p>
              </Styles.AdminListGroupItem>
            ),
          )}
      </Styles.AdminListGroup>
      {data.users &&
        data.users.total &&
        search.trim() === '' &&
        data.users.total > perPage &&
        renderPagination()}
    </Fragment>
  );
};

AdminUsersList.defaultProps = {
  search: '',
};

AdminUsersList.propTypes = {
  search: PropTypes.string,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default AdminUsersList;
