import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

import Authentication from '../../ui/global/context/Authentication';
import GlobalStyle from './GlobalStyle';
import App from '../../ui/layouts/App';

Bert.defaults = {
  hideDelay: 5500,
  style: 'growl-bottom-right',
};

fontAwesomeLibrary.add(fas);

const target = document.getElementById('react-root');
const root = createRoot(target);

Meteor.startup(() => {
  const app = (
    <ThemeProvider theme={{}}>
      <Authentication>
        <GlobalStyle />
        <App />
      </Authentication>
    </ThemeProvider>
  );
  root.render(app);
});
