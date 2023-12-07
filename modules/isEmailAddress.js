/* eslint-disable import/prefer-default-export */
const isEmailAddress = (email) => new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email);

export { isEmailAddress };
