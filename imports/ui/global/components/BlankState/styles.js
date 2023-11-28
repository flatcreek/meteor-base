import styled from 'styled-components';

const BlankState = styled.div`
  padding: 40px 0;
  text-align: center;

  img {
    max-width: 300px;
    margin-bottom: 20px;
  }

  svg {
    color: var(--gray-lighter);
    color: ${(props) => (props.iconColor ? `var(--${props.iconColor})` : '#ccc')};
    margin-bottom: 20px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #666;
    margin-bottom: 0;
  }

  p {
    font-size: 15px;
    font-weight: normal;
    color: #aaa;
    margin-top: 10px !important;
    margin-bottom: 0;
  }

  .btn {
    margin-top: 20px;
    margin-bottom: 0 !important;
  }
`;

export default {
  BlankState,
};
