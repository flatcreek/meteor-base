import styled from 'styled-components';

const StyledLogin = styled.div`
  border: 1px solid var(--gray-lighter);
  padding: 25px;
  border-radius: 3px;
  max-width: 768px;
  margin: 0 auto;

  .page-header {
    margin-top: 0;
  }

  > .row {
    margin: 0 !important;
  }

  button[type='submit'] {
    height: 41px;
    margin-top: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
    margin-top: 0px;
    display: flex;
    flex-direction: row;

    > .row {
      width: 55%;
      padding: 40px 25px;
    }
  }

  @media screen and (min-width: 992px) {
    max-width: 900px;

    > .row {
      width: 50%;
    }
  }
`;

export default {
  StyledLogin,
};
