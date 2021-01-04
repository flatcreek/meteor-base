import styled from 'styled-components';
import { lighten } from 'polished';

const Logout = styled.div`
  padding: 20px;
  background: var(--mb-blue);
  text-align: center;
  border-radius: 3px;
  color: #fff;

  p {
    line-height: 22px;
    color: ${lighten(0.25, '#4285F4')};
  }

  @media screen and (min-width: 768px) {
    padding: 30px;
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    p {
      font-size: 1.1rem;
      line-height: 24px;
    }
  }
`;

export default {
  Logout,
};
