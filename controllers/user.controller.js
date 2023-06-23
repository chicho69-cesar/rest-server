const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  const queryParams = req.query;
  const { offset = 0, limit = 10 } = queryParams;

  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(offset)
      .limit(limit)
  ]);

  res.status(200).json({
    total,
    users
  });
}

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt the password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save on DB
  await user.save();

  res.json({
    user
  });
}

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encrypt the password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  // Update on DB
  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    ok: true,
    user
  });
}

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;

  // Physically delete
  // const user = await User.findByIdAndDelete(id);

  // Soft delete
  const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
  // const userAuth = req.user;

  res.json({
    user/* ,
    userAuth */
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
