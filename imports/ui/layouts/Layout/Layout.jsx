import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { Outlet } from 'react-router-dom';

import Footer from '../../global/components/Footer';
import Loading from '../../global/components/Loading';
import Navigation from '../../global/components/Navigation';
import SEO from '../../global/components/SEO';
import { AuthContext } from '../../global/context/Authentication';
import VerifyEmailAlert from '../../users/components/VerifyEmailAlert';
import Styles from './styles';

const { productName } = Meteor.settings.public;

const Layout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <Styles.App>
      <SEO title={`${productName}`} />
      <header>
        <Navigation />
        <VerifyEmailAlert />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Styles.App>
  );
};

export default Layout;
