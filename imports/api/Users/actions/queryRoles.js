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
  } catch (exception) {
    throw new Error(`[queryRoles] ${exception.message}`);
  }
};

export default queryRoles;
