const { Router } = require('express');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers
} = require('../controllers/user.controller');

const {
  getLimitChain,
  getOffsetChain,
  createNameChain,
  createEmailChain,
  createPasswordChain,
  createRoleCustomChain,
  createRoleChain,
  putIDChain
} = require('../validators/user.validator');

/* const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');
const { validateIsAdminRole, validateHasRole } = require('../middlewares/validate-roles'); */

const {
  validateFields,
  validateJWT,
  validateIsAdminRole,
  validateHasRole
} = require('../middlewares');

const router = Router();

router.get('/', [
  getLimitChain(),
  getOffsetChain(),
  validateFields
], getUsers);

router.post('/', [
  createNameChain(),
  createEmailChain(),
  createPasswordChain(),
  createRoleCustomChain(),
  // createRoleChain(),
  validateFields
], postUsers);

router.put('/:id', [
  putIDChain(),
  createRoleCustomChain(),
  validateFields
], putUsers);

router.delete('/:id', [
  validateJWT,
  // validateIsAdminRole,
  validateHasRole('ADMIN_ROLE', 'SALES_ROLE'),
  putIDChain(),
  validateFields
], deleteUsers);

router.patch('/', patchUsers);

module.exports = router;
