import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #337ab7;
    --success: #5cb85c;
    --info: #5bc0de;
    --warning: #f0ad4e;
    --danger: #d9534f;

    --gray-darker: #222;
    --gray-dark: #333;
    --gray: #555;
    --gray-light: #777;
    --gray-lighter: #eee;

    --facebook: #3b5998;
    --google: #ea4335;
    --github: var(--gray-dark);

    --cb-blue: #4285F4;
    --cb-green: #00D490;
    --cb-yellow: #FFCF50;
    --cb-red: #DA5847;
  }

  body.isViewDocument {
    padding-top: 20px;
  }

  body.isViewDocument .navbar {
    display: none;
  }

  .tab-pane {
    padding: 1rem!important;
  }

  .table tr td {
    vertical-align: middle !important;
  }

  /* Removes unnecessary bottom padding on .container */
  body > #react-root > div > .container {
    padding-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    body.isViewDocument {
      padding-top: 40px;
    }

    .page-header {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
`;

export default GlobalStyle;
