const { Router } = require('express');

const {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
} = require('../controllers/product.controller');

const {
  getLimitChain,
  getOffsetChain,
  getProductIdChain,
  createNameChain,
  createPriceChain,
  createCategoryChain
} = require('../validators/product.validator')

const { validateFields, validateJWT, validateIsAdminRole } = require('../middlewares');

const router = Router();

router.get('/', [
  getLimitChain(),
  getOffsetChain(),
  validateFields
], getProducts);

router.get('/:id', [
  getProductIdChain(),
  validateFields
], getProduct);

router.post('/', [
  validateJWT,
  createNameChain(),
  createPriceChain(),
  createCategoryChain(),
  validateFields
], postProduct);

router.put('/:id', [
  validateJWT,
  getProductIdChain(),
  createNameChain(),
  createPriceChain(),
  createCategoryChain(),
  validateFields
], putProduct);

router.delete('/:id', [
  validateJWT,
  validateIsAdminRole,
  getProductIdChain(),
  validateFields
], deleteProduct);

module.exports = router;
