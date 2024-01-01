import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  console.log('startup.onCreateUser.user:');
  console.log(user);
  console.log(options);

  return user;
});
