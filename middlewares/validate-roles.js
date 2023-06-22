const { request, response } = require('express');

const validateIsAdminRole = async (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'You want to verify the role without validating the token first'
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not an administrator`
    });
  }

  next();
}

const validateHasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'You want to verify the role without validating the token first'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service require one of these roles: ${roles}`
      });
    }

    next();
  }
}

module.exports = {
  validateIsAdminRole,
  validateHasRole
}
