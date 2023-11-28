/* eslint-disable consistent-return */

const checkForOAuthServices = (user) => {
  try {
    let hasOAuthService = false;
    const oAuthServices = ['facebook', 'google', 'github', 'twitter', 'meetup', 'meteor-developer'];
    Object.keys(user.services).forEach((serviceName) => {
      hasOAuthService = oAuthServices.includes(serviceName); // NOTE: Sets hasOAuthService to true if any oAuthServices match.
    });
    return hasOAuthService;
  } catch (error) {
    throw new Error(`[isOAuthUser.checkForOAuthServices] ${error.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (error) {
    throw new Error(`[isOAuthUser.validateOptions] ${error.message}`);
  }
};

export default (options) => {
  try {
    validateOptions(options);
    return checkForOAuthServices(options.user);
  } catch (error) {
    throw new Error(`[isOAuthUser] ${error.message}`);
  }
};
