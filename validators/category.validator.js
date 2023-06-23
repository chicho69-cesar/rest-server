const { body, param, query } = require('express-validator');
const { validateCategoryExist } = require('../helpers/db-validator');

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

const getCategoryIdChain = () =>
  param('id')
    .isMongoId().withMessage('Invalid category id')
    .custom(validateCategoryExist);

// POST chains
const createNameChain = () =>
  body('name')
    .notEmpty()
    .withMessage('Name is required');

module.exports = {
  getLimitChain,
  getOffsetChain,
  createNameChain,
  getCategoryIdChain
}
