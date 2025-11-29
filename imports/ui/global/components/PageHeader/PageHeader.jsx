import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

const PageHeader = ({ title, subtitle }) => (
  <Styles.Wrapper>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </Styles.Wrapper>
);

PageHeader.defaultProps = {
  subtitle: '',
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
