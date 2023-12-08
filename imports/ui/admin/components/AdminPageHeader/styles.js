import styled from 'styled-components';

const AdminUserHeader = styled.h4`
  .badge {
    font-size: 0.65rem;
    margin-right: 12px;
  }
  .badge-Facebook {
    background: var(--facebook);
    color: #fff;
  }

  .badge-Google {
    background: var(--google);
    color: #fff;
  }

  .badge-GitHub {
    background: var(--github);
    color: #fff;
  }
`;

export default {
  AdminUserHeader,
};
