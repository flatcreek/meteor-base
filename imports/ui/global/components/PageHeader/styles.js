import styled from 'styled-components';

const Wrapper = styled.div`
  border-bottom: 1px solid var(--gray-lighter);
  padding: 0px 0 1rem;
  margin-bottom: 1rem;

  h2 {
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0;
    color: var(--gray-light);
  }

  @media screen and (min-width: 768px) {
    padding: 10px 0 1rem;
    margin-bottom: 1rem;

    p {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 20px 0 1rem;
    margin-bottom: 1rem;
  }
`;

export default {
  Wrapper,
};
