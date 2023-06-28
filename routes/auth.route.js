const { Router } = require('express');

const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { loginEmailChain, loginPasswordChain, loginGoogleTokenChain } = require('../validators/auth.validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.get('/', validateJWT, renewToken);

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
