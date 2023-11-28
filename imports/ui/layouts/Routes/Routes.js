import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Layouts
import NoGrid from '../NoGrid';
import NoSidebar from '../NoSidebar';
// import WithSidebar from '../WithSidebar';

// Global pages
import Index from '../../global/pages/Index';
import NotFound from '../../global/pages/NotFound';

// Document pages
import Documents from '../../documents/pages/Documents';
import ViewDocument from '../../documents/pages/ViewDocument';
import EditDocument from '../../documents/pages/EditDocument';

// User pages
import Login from '../../users/pages/Login';
import Logout from '../../users/pages/Logout';
import Profile from '../../users/pages/Profile';
import RecoverPassword from '../../users/pages/RecoverPassword';
import ResetPassword from '../../users/pages/ResetPassword';
import Signup from '../../users/pages/Signup';
import VerifyEmail from '../../users/pages/VerifyEmail';

// Admin pages
import AdminUsers from '../../admin/pages/AdminUsers';
import AdminUser from '../../admin/pages/AdminUser';
import AdminUserSettings from '../../admin/pages/AdminUserSettings';

// Misc pages
import ExamplePage from '../../global/pages/ExamplePage';
import Privacy from '../../global/pages/Privacy';
import Terms from '../../global/pages/Terms';

const Routes = () => (
  <Switch>
    <Route
      exact
      name="index"
      path="/"
      render={(routeProps) => <NoGrid main={Index} {...routeProps} />}
    />

    {/* ----- DOCUMENT ROUTES ----- */}

    <Route
      exact
      path="/documents"
      render={(routeProps) => <NoSidebar main={Documents} authRequired {...routeProps} />}
    />
    <Route
      exact
      path="/documents/:_id"
      render={(routeProps) => <NoSidebar main={ViewDocument} {...routeProps} />}
    />
    <Route
      exact
      path="/documents/:_id/edit"
      render={(routeProps) => <NoSidebar main={EditDocument} authRequired {...routeProps} />}
    />

    {/* ----- USER ROUTES ----- */}

    <Route
      exact
      path="/users/:userProfileId"
      render={(routeProps) => <NoSidebar main={Profile} authRequired {...routeProps} />}
    />

    <Route
      exact
      path={['/profile', '/account', '/settings']}
      render={(routeProps) => <NoSidebar main={Profile} authRequired {...routeProps} />}
    />

    <Route
      exact
      path="/signup"
      render={(routeProps) => <NoGrid main={Signup} isPublic {...routeProps} />}
    />

    <Route
      exact
      path="/login"
      render={(routeProps) => <NoGrid main={Login} isPublic {...routeProps} />}
    />

    <Route
      exact
      path="/logout"
      render={(routeProps) => <NoSidebar main={Logout} {...routeProps} />}
    />

    <Route
      exact
      path="/verify-email/:token"
      render={(routeProps) => <NoSidebar main={VerifyEmail} {...routeProps} />}
    />

    <Route
      exact
      path="/recover-password"
      render={(routeProps) => <NoSidebar main={RecoverPassword} isPublic {...routeProps} />}
    />

    <Route
      exact
      path="/reset-password/:token"
      render={(routeProps) => <NoSidebar main={ResetPassword} isPublic {...routeProps} />}
    />

    {/* ----- MISC PAGES ----- */}

    <Route name="terms" path="/terms" component={Terms} />
    <Route name="privacy" path="/privacy" component={Privacy} />
    <Route name="examplePage" path="/example-page" component={ExamplePage} />

    {/* ----- ADMIN PAGES ----- */}

    <Route
      exact
      path="/admin/users"
      render={(routeProps) => (
        <NoSidebar main={AdminUsers} authRequired allowedRoles={['admin']} {...routeProps} />
      )}
    />

    <Route
      exact
      path="/admin/users/settings"
      render={(routeProps) => (
        <NoSidebar main={AdminUserSettings} authRequired allowedRoles={['admin']} {...routeProps} />
      )}
    />

    <Route
      exact
      path="/admin/users/:_id"
      render={(routeProps) => (
        <NoSidebar main={AdminUser} authRequired allowedRoles={['admin']} {...routeProps} />
      )}
    />

    {/* ----- NOT FOUND ROUTE ----- */}

    <Route render={(routeProps) => <NoSidebar main={NotFound} {...routeProps} />} />

    {/* ----- LEGACY ROUTES TO BE REFACTORED ----- */}
  </Switch>
);

export default Routes;
