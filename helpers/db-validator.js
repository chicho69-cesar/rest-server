const {
  Category,
  Role,
  User
} = require('../models');

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

const validateUserExist = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`The user with id ${id} doesn't exist`);
  }

  return true;
}

const validateCategoryExist = async (id) => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`The category with id ${id} doesn't exist`);
  }

  return true;
}

module.exports = {
  validateEmailExist,
  validateRole,
  validateUserExist,
  validateCategoryExist
}
