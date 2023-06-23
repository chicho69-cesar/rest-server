const { Router } = require('express');

const { login, googleSignIn } = require('../controllers/auth.controller');
const { loginEmailChain, loginPasswordChain, loginGoogleTokenChain } = require('../validators/auth.validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
  loginEmailChain(),
  loginPasswordChain(),
  validateFields
], login);

router.post('/google', [
  loginGoogleTokenChain(),
  validateFields
], googleSignIn);

module.exports = router;
