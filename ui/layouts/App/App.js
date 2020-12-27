import React from 'react';
import { Meteor } from 'meteor/meteor';

import Footer from '../../global/components/Footer';
import Navigation from '../../global/components/Navigation';
import SEO from '../../global/components/SEO';
import VerifyEmailAlert from '../../users/components/VerifyEmailAlert';
import Routes from '../Routes';
import Styles from './styles';

const { productName } = Meteor.settings.public;

const App = () => {
  return (
    <Styles.App>
      <SEO title={`${productName}`} />
      <Navigation />
      <VerifyEmailAlert />
      <Routes />
      <Footer />
    </Styles.App>
  );
};

export default App;
