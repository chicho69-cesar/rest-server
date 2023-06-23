const { Router } = require('express');

const {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
} = require('../controllers/category.controller');

const {
  getLimitChain,
  getOffsetChain,
  createNameChain,
  getCategoryIdChain
} = require('../validators/category.validator');

const { validateFields, validateJWT, validateIsAdminRole } = require('../middlewares');

const router = Router();

// Get all categories - public
router.get('/', [
  getLimitChain(),
  getOffsetChain(),
  validateFields
], getCategories);

// Get category by id - public
router.get('/:id', [
  getCategoryIdChain(),
  validateFields
], getCategory);

// Create category - private - any user
router.post('/', [
  validateJWT,
  createNameChain(),
  validateFields
], postCategory);

// Update category - private - any user
router.put('/:id', [
  validateJWT,
  getCategoryIdChain(),
  createNameChain(),
  validateFields
], putCategory);

// Delete category - private - admin
router.delete('/:id', [
  validateJWT,
  validateIsAdminRole,
  getCategoryIdChain(),
  validateFields
], deleteCategory);

module.exports = router;
