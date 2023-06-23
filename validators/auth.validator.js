const { body } = require('express-validator');

const loginEmailChain = () =>
  body('email')
    .isLength({ min: 1 }).withMessage('Email is required')
    .isEmail().withMessage('Invalid email');

const loginPasswordChain = () =>
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Invalid password');

const loginGoogleTokenChain = () =>
  body('id_token')
    .notEmpty().withMessage('Google token is required');

module.exports = {
  loginEmailChain,
  loginPasswordChain,
  loginGoogleTokenChain
}
