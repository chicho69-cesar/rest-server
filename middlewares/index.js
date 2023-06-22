const validateFields = require('./validate-fields');
const validateJWT = require('./validate-JWT');
const validateRoles = require('./validate-roles');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles
}
