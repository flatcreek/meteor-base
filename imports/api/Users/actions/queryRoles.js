import { Roles } from 'meteor/alanning:roles';

const queryRoles = (parent, args, context) => {
  console.log('queryRoles.parent:');
  console.log(parent);
  console.log('queryRoles.args:');
  console.log(args);
  console.log('queryRoles.context:');
  console.log(context);
  try {
    return Roles.getAllRoles();
  } catch (error) {
    throw new Error(`[queryRoles] ${error.message}`);
  }
};

export default queryRoles;
