import styled from 'styled-components';

const LoginForm = styled.div`
  border: 1px solid var(--gray-lighter);
  border-radius: 3px;
  margin: 0 auto;
  max-width: 425px;
  padding: 25px;

  .page-header {
    margin-top: 0;
  }

  > .row {
    margin: 0 !important;
  }

  @media screen and (min-width: 768px) {
    margin-top: 0px;
    padding: 40px 25px;
  }
`;

export default {
  LoginForm,
};
