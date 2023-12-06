import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

import Styles from './styles';

const PaginationComponent = ({ onChangePage, pageCount, skipCount }) => {
  const active = skipCount;
  const items = [];
  // eslint-disable-next-line no-plusplus
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => onChangePage(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Styles.Pagination>
      <Pagination>
        <Pagination.Prev onClick={() => onChangePage(active - 1)} />
        {items}
        <Pagination.Next onClick={() => onChangePage(active + 1)} />
      </Pagination>
    </Styles.Pagination>
  );
};

PaginationComponent.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  skipCount: PropTypes.number.isRequired,
};

export default PaginationComponent;
