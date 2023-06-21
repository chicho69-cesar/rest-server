const { body } = require("express-validator");
const User = require('../models/user');
const Role = require('../models/role');

const createNameChain = () =>
  body('name')
    .notEmpty().withMessage('Name is required');

const createEmailChain = () =>
  body('email')
    .isLength({ max: 150 }).withMessage('Email must not exceed 150 characters')
    .isEmail().withMessage('Invalid email address')
    .custom(async (value) => {
      const existEmail = await User.findOne({ email: value });
      if (existEmail) {
        throw new Error('That email is already registered');
      }

      return true;
    });

const createPasswordChain = () =>
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters');

const createRoleCustomChain = () =>
  body('role')
    .custom(async (value = '') => {
      const roleExists = await Role.findOne({ role: value });
      if (!roleExists) {
        throw new Error(`The role ${value} isn't registered in the database`);
      }

      return true;
    });

const createRoleChain = () =>
  body('role')
    .isIn(['ADMIN_ROLE', 'USER_ROLE'])
    .withMessage('Invalid role');

module.exports = {
  createNameChain,
  createEmailChain,
  createPasswordChain,
  createRoleCustomChain,
  createRoleChain
};
