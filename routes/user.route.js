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
  // createRoleChain,
  putIDChain
} = require('../validators/user.validator');
const { validateFields } = require('../middlewares/validate-fields');

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

router.delete('/', deleteUsers);

router.patch('/', patchUsers);

module.exports = router;
