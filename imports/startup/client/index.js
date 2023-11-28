/* eslint-disable no-underscore-dangle, no-unused-expressions */
import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

import Authentication from '../../ui/global/context/Authentication';
import App from '../../ui/layouts/App';
import GlobalStyle from './GlobalStyle';

Bert.defaults = {
  hideDelay: 5500,
  style: 'growl-bottom-right',
};

fontAwesomeLibrary.add(fas);

Meteor.startup(() => {
  const target = document.getElementById('react-root');
  const app = (
    <ThemeProvider theme={{}}>
      <Authentication>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <App />
          </Switch>
        </BrowserRouter>
      </Authentication>
    </ThemeProvider>
  );

  return !window.noSSR ? hydrate(app, target) : render(app, target);
});
