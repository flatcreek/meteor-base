/* eslint-disable jsx-a11y/anchor-is-valid */
import { Meteor } from 'meteor/meteor';
import React, { Fragment } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import Loading from '../../../global/components/Loading';
import Styles from './styles';

const AdminUsersList = (props) => {
  const { perPage, currentPage, onChangePage, search } = props;
  const isLoading = useSubscribe('precincts', {
    perPage,
    currentPage,
    search,
  });
  const data = useFind(() => Meteor.users.find());

  console.log('AdminUsersList.data:');
  console.log(data);

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

  if (isLoading()) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Styles.AdminListGroup>
        {data.users &&
          data.users.users &&
          data.users.users.map(
            ({ _id, emailAddress, name, username, oAuthProvider, emailVerified }) => (
              <LinkContainer to={`/admin/users/${_id}`} key={_id}>
                <Styles.AdminListGroupItem>
                  <div>
                    {name ? `${name.first} ${name.last}` : username}
                    <span className="list-email">{emailAddress}</span>
                    {oAuthProvider && (
                      <span className={`badge badget-${oAuthProvider}`}>{oAuthProvider}</span>
                    )}
                    {!emailVerified && (
                      <Styles.AdminLabel variant="danger">Email not verified</Styles.AdminLabel>
                    )}
                  </div>
                </Styles.AdminListGroupItem>
              </LinkContainer>
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
