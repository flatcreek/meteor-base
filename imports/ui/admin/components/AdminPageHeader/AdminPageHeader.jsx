import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Styles from './styles';

const AdminPageHeader = ({ title, badges }) => (
  <Styles.AdminUserHeader className="pb-2 mt-4 mb-4 border-bottom">
    {title}{' '}
    {badges &&
      badges.map((badge) => (
        <Badge key={badge} bg="info" style={{ fontSize: 12 }}>
          {badge}
        </Badge>
      ))}
  </Styles.AdminUserHeader>
);

AdminPageHeader.defaultProps = {
  badges: null,
};

AdminPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  badges: PropTypes.array,
};

export default AdminPageHeader;
