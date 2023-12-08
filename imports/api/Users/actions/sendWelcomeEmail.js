/* eslint-disable consistent-return */
import { Meteor } from 'meteor/meteor';
import normalizeMeteorUserData from './normalizeMeteorUserData';
import sendEmail from '../../../../modules/server/sendEmail';

const getEmailOptions = (user) => {
  try {
    const { firstName } = user?.profile || {};
    const { productName } = Meteor.settings.public;

    return {
      to: user.emails[0].address,
      from: Meteor.settings.private.supportEmail,
      subject: `[${Meteor.settings.public.productName}] Welcome, ${firstName}!`,
      template: 'welcome',
      templateVars: {
        title: `Welcome, ${firstName}!`,
        subtitle: `Here's how to get started with ${productName}.`,
        productName,
        firstName,
        welcomeUrl: Meteor.absoluteUrl(), // e.g., returns http://localhost:3000/
      },
    };
  } catch (error) {
    throw new Error(`[sendWelcomeEmail.getEmailOptions] ${error.message}`);
  }
};

const sendWelcomeEmail = () => {
  try {
    const user = normalizeMeteorUserData({ user: Meteor.user() });
    const emailOptions = getEmailOptions(user);

    sendEmail(emailOptions).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Meteor.Error(500, `[sendWelcomeEmail] ${error.message}`);
  }
};

export default sendWelcomeEmail;
