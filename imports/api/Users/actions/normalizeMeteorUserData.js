/* eslint-disable consistent-return */

const normalizeGoogleData = (service) => {
  try {
    return {
      service: 'google',
      emails: [{ address: service.email }],
      profile: {
        firstName: service.given_name,
        lastName: service.family_name,
      },
    };
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData.normalizeGoogleData] ${error.message}`);
  }
};

const normalizeGithubData = (service) => {
  try {
    return {
      service: 'github',
      emails: [{ address: service.email }],
      username: service.username,
    };
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData.normalizeGithubData] ${error.message}`);
  }
};

const normalizeFacebookData = (service) => {
  try {
    return {
      service: 'facebook',
      emails: [{ address: service.email }],
      profile: {
        firstName: service.first_name,
        lastName: service.last_name,
      },
    };
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData.normalizeFacebookData] ${error.message}`);
  }
};

const normalizeOAuthUserData = (services) => {
  try {
    if (services.facebook) return normalizeFacebookData(services.facebook);
    if (services.github) return normalizeGithubData(services.github);
    if (services.google) return normalizeGoogleData(services.google);
    return {};
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData.normalizeOAuthUserData] ${error.message}`);
  }
};

const getNormalizedMeteorUserData = (isOAuthUser, user) => {
  try {
    return isOAuthUser
      ? { _id: user._id, ...normalizeOAuthUserData(user.services), settings: user.settings }
      : { service: 'password', ...user };
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData.getNormalizedMeteorUserData] ${error.message}`);
  }
};

const checkIfOAuthUser = (services) => {
  try {
    // NOTE: If services does not exist, we assume it's the current user being passed on the client.
    return !services ? false : !services.password;
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData.checkIfOAuthUser] ${error.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) {
      throw new Error('options object is required.');
    }
    if (!options.user) {
      throw new Error('options.user is required.');
    }
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData.validateOptions] ${error.message}`);
  }
};

export default (options) => {
  try {
    validateOptions(options);

    const isOAuthUser = checkIfOAuthUser(options.user.services);
    const normalizedMeteorUserData = getNormalizedMeteorUserData(isOAuthUser, options.user);

    return normalizedMeteorUserData;
  } catch (error) {
    throw new Error(`[normalizeMeteorUserData] ${error.message}`);
  }
};
