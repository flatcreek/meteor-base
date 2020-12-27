/* eslint-disable consistent-return */
import normalizeMeteorUserData from './normalizeMeteorUserData';

export default (options) => {
  try {
    const normalizedMeteorUserData = normalizeMeteorUserData(options);

    return {
      _id: normalizedMeteorUserData._id,
      createdAt: normalizedMeteorUserData.createdAt,
      name: normalizedMeteorUserData.profile.name,
      emailAddress: normalizedMeteorUserData.emails[0].address,
      emailVerified: normalizedMeteorUserData.emails[0].verified,
      roles: normalizedMeteorUserData.roles,
      oAuthProvider:
        normalizedMeteorUserData.service !== 'password' ? normalizedMeteorUserData.service : null,
      settings: normalizedMeteorUserData.settings,
    };
  } catch (exception) {
    throw new Error(`[mapMeteorUserToSchema] ${exception.message}`);
  }
};
