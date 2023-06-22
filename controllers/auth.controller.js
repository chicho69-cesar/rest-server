const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-JWT');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify that the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User not found with the email or password given'
      });
    }

    // Verify if the user is active in the DB
    if (!user.status) {
      return res.status(400).json({
        ok: false,
        msg: 'User is not found in the DB'
      });
    }

    // Verify the password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'User not found with the email or password given'
      });
    }

    // Generate the JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    });
  }
}

module.exports = {
  login
}
