const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {
  const queryParams = req.query;
  const { q, name = 'No name', apiKey } = queryParams;

  res.status(200).json({
    ok: true,
    msg: 'get API',
    params: {
      q,
      name,
      apiKey
    }
  });
}

const postUsers = async (req = request, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt the password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save on DB
  await user.save();

  res.json({
    msg: 'post API',
    user
  });
}

const putUsers = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    ok: true,
    msg: 'put API',
    id
  });
}

const deleteUsers = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'delete API'
  });
}

const patchUsers = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API'
  });
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers
}
