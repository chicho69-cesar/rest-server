const { request, response } = require('express');

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

const postUsers = (req = request, res = response) => {
  const body = req.body;
  const { name, age } = body;

  res.json({
    ok: true,
    msg: 'post API',
    user: {
      name,
      age
    }
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
