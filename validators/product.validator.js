const { body, param, query } = require('express-validator');
const { validateProductExist, validateCategoryExist } = require('../helpers/db-validator');

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

const getProductIdChain = () =>
  param('id')
    .isMongoId().withMessage('Invalid product id')
    .custom(validateProductExist);

// POST chains
const createNameChain = () =>
  body('name')
    .notEmpty().withMessage('Name is required');

const createPriceChain = () =>
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive float');

const createCategoryChain = () =>
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category id')
    .custom(validateCategoryExist);

module.exports = {
  getLimitChain,
  getOffsetChain,
  getProductIdChain,
  createNameChain,
  createPriceChain,
  createCategoryChain
}
