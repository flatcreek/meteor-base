/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { useLazyQuery } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import { Bert } from 'meteor/themeteorchef:bert';

import { user as GET_USER } from '../../../users/queries/Users.gql';

const initialAuthState = {
  emailAddress: '',
  emailVerified: false,
  firstName: '',
  lastName: '',
  loading: true,
  profilePic: '',
  roles: {},
  userId: '',
};

export const AuthContext = React.createContext(initialAuthState);

const Authentication = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);
  const [userRoles, setUserRoles] = useState(null);
  const [loading, setLoading] = useState(true);

  // currentUser is the user returned from Meteor's tracker. It is a reactive data source.
  // However, it does not include all user fields.
  const currentUser = useTracker(() => Meteor.user(), []);

  // Because currentUser does not include all user fields, we use an Apollo lazy query to fetch
  // a full, formatted user object with the fields we need
  const [getUser, { data: userData, loading: queryLoading, refetch }] = useLazyQuery(GET_USER);

  const resetAuthState = () => {
    setAuthState(initialAuthState);
  };

  const handleLoading = () => {
    const loggingIn = Meteor.loggingIn();
    const loadingStatus = loggingIn || queryLoading;

    setLoading(loadingStatus);
  };

  const handleUpdateContext = async () => {
    // First we wait if Meteor is logging in or pulling a query
    handleLoading();
    // Next we confirm that the user is, in fact, logged in
    if (currentUser) {
      // Then we check that the query has returned a data object for the current user
      if (userData && userData.user) {
        // Finally, we check that the user ID for the returned data object matches
        // the currently logged in user
        const idMatch = currentUser._id === userData.user._id;
        if (idMatch) {
          const { emailAddress, emailVerified, name, profilePic } = userData.user || {};
          const firstName = name && name.first;
          const lastName = name && name.last;
          // Use the Roles package to be sure we are pulling the user's roles directly from the collection
          const roles = Roles.getRolesForUser(currentUser._id);

          const authObj = {
            emailAddress,
            emailVerified,
            firstName,
            lastName,
            refetch,
            roles,
            profilePic,
            userId: currentUser._id,
          };

          setAuthState(authObj);
        } else {
          console.warn('Authentication.updateContext -- user ID mismatch');
          console.warn(`currentUser ID: ${currentUser._id}`);
          console.warn(`userData ID: ${userData.thisUser._id}`);
        }
      } else {
        console.warn('Authentication.updateContext -- No thisUser');
        console.warn(`currentUser ID: ${currentUser._id}`);
        console.warn(`userData ID: ${userData.thisUser._id}`);
      }
    }
  };

  // We use a local method to check roles on the client so we don't
  // have any database calls via the actual Roles package.
  const isInRole = (roles, parentId) => {
    if (!isEmpty(userRoles)) {
      const roleArray = Array.isArray(roles) ? roles : roles.split();

      if (!roleArray.length) return false;

      return roleArray.some((roleName) => {
        if (parentId) {
          return userRoles[parentId] && userRoles[parentId].includes(roleName);
        }
        return userRoles.__global_roles__.includes(roleName);
      });
    }
    return false;
  };

  const login = async () => {
    try {
      getUser();
    } catch (error) {
      console.warn('Authentication.login error:');
      console.warn(error);
      Bert.alert(error.message, 'danger');
    }
  };

  // This starts the process of setting auth state by fetching user details
  // if there's a change to the current user via Meteor's Tracker
  useEffect(() => {
    if (currentUser && currentUser.roles) {
      setUserRoles(currentUser && currentUser.roles);
      getUser({ variables: { _id: currentUser._id } });
    }
  }, [currentUser]);

  // This actually updates auth state when the user data changes
  useEffect(() => {
    handleUpdateContext();
  }, [userData]);

  // This puts the app into loading state if the query is running
  useEffect(() => {
    handleLoading();
  }, [queryLoading]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loading,
        setAuthState,
        isInRole,
        resetAuthState,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

Authentication.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Authentication;
