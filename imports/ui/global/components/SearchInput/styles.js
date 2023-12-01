import styled from 'styled-components';

const SearchInput = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 10px;
    color: var(--gray-light);
  }

  .form-control {
    padding-left: 36px;
  }
`;

export default {
  SearchInput,
};
