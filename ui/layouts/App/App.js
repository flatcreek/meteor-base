import React, { Fragment, useContext } from 'react';
import { Meteor } from 'meteor/meteor';

import Footer from '../../global/components/Footer';
import Loading from '../../global/components/Loading';
import Navigation from '../../global/components/Navigation';
import SEO from '../../global/components/SEO';
import { AuthContext } from '../../global/context/Authentication';
import VerifyEmailAlert from '../../users/components/VerifyEmailAlert';
import Routes from '../Routes';
import Styles from './styles';

const { productName } = Meteor.settings.public;

const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Styles.App>
        <SEO title={`${productName}`} />
        <Navigation />
        <VerifyEmailAlert />
        <Routes />
      </Styles.App>
      <Footer />
    </Fragment>
  );
};

export default App;
