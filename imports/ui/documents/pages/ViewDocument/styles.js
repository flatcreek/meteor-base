import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';

const StyledViewDocument = styled.div`
  border: 1px solid var(--gray-lighter);
  padding: 25px;
  border-radius: 3px;
  max-width: 750px;
  margin: 0 auto 20px;

  @media screen and (min-width: 768px) {
    margin-top: 20px;
    padding: 50px;
  }
`;

const StyledAlert = styled(Alert)`
  svg {
    margin-right: 12px;
  }
`;

const DocumentBody = styled.div`
  font-size: 16px;
  line-height: 22px;

  > * {
    margin-bottom: 20px;
    white-space: pre-line;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export default {
  StyledAlert,
  StyledViewDocument,
  DocumentBody,
};
