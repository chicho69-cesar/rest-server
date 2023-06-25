const { request, response } = require('express');
const {
  searchUsers,
  searchCategories,
  searchProducts,
  searchProductsByCategory
} = require('../helpers/db-searches');

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  const allowedCollections = [
    'users',
    'categories',
    'products',
    'products-category',
    'roles'
  ];

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed collections are: ${allowedCollections}`
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res);
      break;

    case 'categories':
      searchCategories(term, res);
      break;

    case 'products':
      searchProducts(term, res);
      break;

    case 'products-category':
      searchProductsByCategory(term, res);
      break;

    default:
      res.status(500).json({
        msg: 'This search is not implemented yet'
      });
  }
}

module.exports = {
  search
}
