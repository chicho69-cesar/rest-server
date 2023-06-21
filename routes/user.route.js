const { Router } = require('express');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers
} = require('../controllers/user.controller');
const {
  createNameChain,
  createEmailChain,
  createPasswordChain,
  createRoleChain
} = require('../validators/validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUsers);

router.post('/', [
  createNameChain(),
  createEmailChain(),
  createPasswordChain(),
  createRoleChain(),
  validateFields
], postUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);

router.patch('/', patchUsers);

module.exports = router;
