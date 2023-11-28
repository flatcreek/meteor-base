import styled from 'styled-components';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

const Setting = styled(ListGroupItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
    word-break: break-word;
  }

  .btn:last-child {
    margin-left: 10px;
    margin-right: -5px;
  }
`;

export default {
  Setting,
};
