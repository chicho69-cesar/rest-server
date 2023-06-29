const jwt = require('jsonwebtoken');
const { User } = require('../models');

const checkJWT = async (token = '') => {
  try {
    if (token.length < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return user.status ? user : null;
    } else {
      return user;
    }
  } catch (error) {
    return null;
  }
}

module.exports = {
  checkJWT
}
