const { Router } = require('express');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers
} = require('../controllers/user.controller');
const { createEmailChain, createPasswordChain } = require('../validators/validator');

const router = Router();

router.get('/', getUsers);
router.post('/', [
  createEmailChain(),
  createPasswordChain()
], postUsers);
router.put('/:id', putUsers);
router.delete('/', deleteUsers);
router.patch('/', patchUsers);

module.exports = router;
