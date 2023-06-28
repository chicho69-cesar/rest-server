const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-JWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    // Extract the google verified user
    const { name, email, img } = await googleVerify(id_token);

    // Search if the user exists in the DB
    let user = await User.findOne({ email });

    // If the user doesn't exist, create it
    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      };

      user = new User(data);
      await user.save();
    }

    // Verify if the user is active in the DB
    if (!user.status) {
      return res.status(401).json({
        ok: false,
        msg: 'User blocked, talk with the administrator'
      });
    }

    // Generate the JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Invalid token, could not verify'
    });
  }
}

const renewToken = async (req = request, res = response) => {
  const { user } = req;
  const token = await generateJWT(user.id);

  res.json({
    user,
    token
  });
}

module.exports = {
  login,
  googleSignIn,
  renewToken
}
