const { Router } = require('express');

const { login } = require('../controllers/auth.controller');
const { loginEmailChain, loginPasswordChain } = require('../validators/auth.validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
  loginEmailChain(),
  loginPasswordChain(),
  validateFields
], login);

module.exports = router;
