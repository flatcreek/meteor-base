import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Styles from './styles';

const SearchInput = ({ placeholder, value, onChange }) => (
  <Styles.SearchInput className="SearchInput">
    <FontAwesomeIcon icon="search" />
    <input
      type="text"
      name="search"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Styles.SearchInput>
);

SearchInput.defaultProps = {
  placeholder: 'Search...',
  value: '',
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
