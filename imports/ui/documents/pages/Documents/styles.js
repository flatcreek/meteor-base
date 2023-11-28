import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const StyledDocuments = styled.div`
  header {
    margin: 20px 0 20px;
  }

  @media screen and (min-width: 768px) {
    header {
      margin: 20 0 20px;
    }
  }
`;

const StyledCard = styled(Card)`
  height: 100%;

  &:hover {
    transform: scale(1.02, 1.02);
    cursor: pointer;
  }
`;

export default {
  StyledDocuments,
  StyledCard,
};
