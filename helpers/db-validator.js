const User = require('../models/user');
const Role = require('../models/role');

const validateEmailExist = async (value) => {
  const existEmail = await User.findOne({ email: value });
  if (existEmail) {
    throw new Error('That email is already registered');
  }

  return true;
}

const validateRole = async (value = '') => {
  const roleExists = await Role.findOne({ role: value });
  if (!roleExists) {
    throw new Error(`The role ${value} isn't registered in the database`);
  }

  return true;
}

module.exports = {
  validateEmailExist,
  validateRole
}
