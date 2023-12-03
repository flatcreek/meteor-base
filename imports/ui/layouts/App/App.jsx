import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Loaders
// import publicLoader from './loaders/publicLoader';

// Layouts
import Layout from '../Layout/Layout';
import NoGrid from '../NoGrid';
import NoSidebar from '../NoSidebar';

// Global pages
import Home from '../../global/pages/Home';
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

// Misc pages
import ExamplePage from '../../global/pages/ExamplePage';
import Privacy from '../../global/pages/Privacy';
import Terms from '../../global/pages/Terms';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NoSidebar main={NotFound} />,
    children: [
      {
        errorElement: <NoGrid main={NotFound} />,
        children: [
          {
            path: '/',
            element: <NoGrid main={Home} />,
          },
          {
            path: '/login',
            element: <NoGrid main={Login} isPublic />,
          },
          {
            path: '/logout',
            element: <NoGrid main={Logout} />,
          },
          {
            path: '/recover-password',
            element: <NoGrid main={RecoverPassword} isPublic />,
          },
          {
            path: '/reset-password/:token',
            element: <NoGrid main={ResetPassword} isPublic />,
          },
          {
            path: '/signup',
            element: <NoGrid main={Signup} isPublic />,
          },
          {
            path: '/verify-email/:token',
            element: <NoGrid main={VerifyEmail} />,
          },
          {
            path: '/profile',
            element: <NoSidebar main={Profile} authRequired />,
          },
          {
            path: '/account',
            element: <NoSidebar main={Profile} authRequired />,
          },
          {
            path: '/settings',
            element: <NoSidebar main={Profile} authRequired />,
          },
          {
            path: '/terms',
            element: <NoSidebar main={Terms} />,
          },
          {
            path: '/privacy',
            element: <NoSidebar main={Privacy} />,
          },
          {
            path: '/example-page',
            element: <NoSidebar main={ExamplePage} />,
          },
          {
            path: '/admin',
            element: <NoSidebar main={AdminUsers} authRequired allowedRoles={['admin']} />,
          },
          {
            path: '/admin/users',
            element: <NoSidebar main={AdminUsers} authRequired allowedRoles={['admin']} />,
          },
          {
            path: '/admin/users/:userId',
            element: <NoSidebar main={AdminUser} authRequired allowedRoles={['admin']} />,
          },
          {
            path: '/documents',
            element: <NoSidebar main={Documents} authRequired />,
          },
          {
            path: '/documents/:documentId',
            element: <NoSidebar main={ViewDocument} />,
          },
          {
            path: '/documents/:documentId/edit',
            element: <NoSidebar main={EditDocument} authRequired />,
          },
          {
            path: '*',
            element: <NoGrid main={NotFound} />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
