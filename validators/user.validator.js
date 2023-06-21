const { body } = require("express-validator");
const { validateEmailExist, validateRole } = require('../helpers/db-validator');

const createNameChain = () =>
  body('name')
    .notEmpty().withMessage('Name is required');

const createEmailChain = () =>
  body('email')
    .isLength({ max: 150 }).withMessage('Email must not exceed 150 characters')
    .isEmail().withMessage('Invalid email address')
    .custom(validateEmailExist);

const createPasswordChain = () =>
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters');

const createRoleCustomChain = () =>
  body('role')
    .custom(validateRole);

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
