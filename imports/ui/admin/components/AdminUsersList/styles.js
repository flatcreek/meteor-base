import styled from 'styled-components';
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap';

const AdminLabel = styled(Badge)`
  font-size: 0.65rem;
  margin-left: 12px !important;
`;

const AdminListGroup = styled(ListGroup)``;

const AdminListGroupItem = styled(ListGroupItem)`
  &:hover {
    background: #fafafa;
    cursor: pointer;
  }

  .list-email {
    color: var(--gray-light);
    margin-left: 12px;
  }
`;

export default {
  AdminLabel,
  AdminListGroup,
  AdminListGroupItem,
};
