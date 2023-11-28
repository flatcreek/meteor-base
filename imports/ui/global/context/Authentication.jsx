/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import isEmpty from 'lodash/isEmpty';

const initialAuthState = {
  emailAddress: '',
  emailVerified: false,
  firstName: '',
  lastName: '',
  loading: true,
  roles: [],
  userId: '',
};

export const AuthContext = React.createContext(initialAuthState);

const Authentication = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);
  const [userRoles, setUserRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryLoading = useSubscribe('currentUser');

  // currentUser is the user returned from Meteor's tracker. It is a reactive data source.
  // However, it does not include all user fields.
  const currentUserId = Meteor.userId();
  useTracker(() => Meteor.user(), []);
  const userData = Meteor.user();

  if (Meteor.isDevelopment) {
    console.log('Authentication.queryLoading:', queryLoading());
    console.log('Authentication.currentUser:', currentUserId);
    console.log(userData);
  }

  const resetAuthState = () => {
    setAuthState(initialAuthState);
  };

  const handleUpdateContext = () => {
    // First we confirm that the user is, in fact, logged in
    if (currentUserId) {
      // Then we check that the query has returned a data object for the current user
      if (userData && userData._id) {
        const { emails, profile } = userData || {};
        const { firstName, lastName } = profile || {};
        const emailAddress = emails[0]?.address;
        const emailVerified = emails[0]?.verified;
        // Use the Roles package to be sure we are pulling the user's roles directly from the collection
        const roles = Roles.getRolesForUser(currentUserId);

        const authObj = {
          emailAddress,
          emailVerified,
          firstName,
          lastName,
          roles,
          userId: currentUserId,
        };

        if (roles && roles.length > 0) {
          setUserRoles(roles);
        } else {
          setUserRoles(null);
        }

        setAuthState(authObj);
      } else {
        console.warn('Authentication.updateContext -- No thisUser');
        console.warn(`currentUser ID: ${currentUserId}`);
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
        return userRoles.includes(roleName);
      });
    }
    return false;
  };

  // Handle loading state
  useEffect(() => {
    const loggingIn = Meteor.loggingIn();
    const loadingStatus = loggingIn || queryLoading();
    setLoading(loadingStatus);
    if (!loadingStatus) {
      handleUpdateContext();
    }
  }, [queryLoading()]);

  // This starts the process of setting auth state by fetching user details
  // if there's a change to the current user via Meteor's Tracker
  useEffect(() => {
    if (authState && authState.roles) {
      setUserRoles(authState && authState.roles);
    }
  }, [currentUserId]);

  // This actually updates auth state when the user data changes
  useEffect(() => {
    handleUpdateContext();
  }, [currentUserId]);

  // // This puts the app into loading state if the query is running
  // useEffect(() => {
  //   handleLoading();
  // }, [queryLoading()]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loading,
        setAuthState,
        isInRole,
        resetAuthState,
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
