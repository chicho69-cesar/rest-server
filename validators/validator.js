const { body } = require("express-validator");
const User = require('../models/user');

const createEmailChain = () =>
  body('email')
    .isLength({ max: 150 }).withMessage('Email must not exceed 150 characters')
    .isEmail().withMessage('Invalid email address')
    .custom(async (value) => {
      const existEmail = await User.findOne({ email: value });
      if (existEmail) {
        throw new Error('That email is already registered');
      }

      return true;
    });

const createPasswordChain = () =>
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters');

module.exports = {
  createEmailChain,
  createPasswordChain
};
