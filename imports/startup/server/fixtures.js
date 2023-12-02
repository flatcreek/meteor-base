import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { faker } from '@faker-js/faker';
import { times } from 'lodash';

const createAdmin = () => {
  if (Meteor.users.find().count() === 0) {
    const { email, password } = Meteor.settings.private.admin;

    const createObj = {
      email,
      password,
    };

    const adminId = Accounts.createUser(createObj);

    console.log(`[Startup] admin created with ID ${adminId}`);

    const updateObj = {
      'emails.0.verified': true,
      profile: {
        firstName: 'Admin',
        lastName: 'McAdmin',
      },
      isFixture: true,
    };

    Roles.addUsersToRoles(adminId, 'admin', Roles.GLOBAL_GROUP);

    Meteor.users.update(adminId, {
      $set: updateObj,
    });

    console.log('[Startup] created admin');

    return adminId;
  }
  return false;
};

const createUsers = () => {
  const { fixtureCount } = Meteor.settings.private.admin;

  if (Meteor.users.find().count() === 1) {
    let count = 1;
    times(fixtureCount, () => {
      const createObj = {
        email: `user${count}@flatcreek.com`,
        password: 'password',
      };

      const userId = Accounts.createUser(createObj);

      const updateObj = {
        'emails.0.verified': faker.datatype.boolean(),
        profile: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        },
        isFixture: true,
      };

      Meteor.users.update(userId, {
        $set: updateObj,
      });

      Roles.addUsersToRoles(userId, 'user', Roles.GLOBAL_GROUP);

      console.log(`[Startup] created user user${count}@flatcreek.com`);

      count += 1;

      return userId;
    });

    return true;
  }
  return false;
};

createAdmin();
createUsers();
