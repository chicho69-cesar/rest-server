const { body, param, query } = require("express-validator");
const { validateEmailExist, validateRole, validateUserExist } = require('../helpers/db-validator');

// GET chains
const getLimitChain = () =>
  query('limit')
    .optional()
    .isInt({ min: 0 }).withMessage('Limit must be a positive integer')
    .toInt();

const getOffsetChain = () =>
  query('offset')
    .optional()
    .isInt({ min: 0 }).withMessage('Offset must be a positive integer')
    .toInt();

// POST chains
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

// PUT chains
const putIDChain = () =>
  param('id')
    .isMongoId().withMessage('Invalid ID')
    .custom(validateUserExist);

module.exports = {
  getLimitChain,
  getOffsetChain,
  createNameChain,
  createEmailChain,
  createPasswordChain,
  createRoleCustomChain,
  createRoleChain,
  putIDChain
};
