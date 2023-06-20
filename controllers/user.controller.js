const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
  // Devolvemos un código de error especifico
  res.status(200).json({
    ok: true,
    msg: 'get API'
  });
}

const postUsers = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'post API'
  });
}

const putUsers = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'put API'
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
