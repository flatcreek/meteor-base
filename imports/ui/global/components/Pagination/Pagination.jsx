import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ pageCount }) => {
  console.log('pageCount', pageCount);
  const active = 2;
  const items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

PaginationComponent.defaultProps = {
  pageCount: 1,
};

PaginationComponent.propTypes = {
  pageCount: PropTypes.number,
};

export default PaginationComponent;
