const { request, response } = require('express');

const { Category, Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  const queryParams = req.query;
  const { offset = 0, limit = 10 } = queryParams;

  const query = {
    status: true
  };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(offset)
      .limit(limit)
      .populate('user', 'name')
      .populate('category', 'name')
  ]);

  res.json({
    total,
    products
  });
}

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  res.json(product);
}

const postProduct = async (req = request, res = response) => {
  const { name, price, category, desc, available } = req.body;

  const productInDB = await Product.findOne({ name: name.toUpperCase() });

  if (productInDB) {
    return res.status(400).json({
      ok: false,
      msg: `The product ${name} already exists`
    });
  }

  const categoryInDB = await Category.findById(category);

  const data = {
    name: name.toUpperCase(),
    user: req.user._id,
    price,
    category: categoryInDB._id,
    desc,
    available
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
}

const putProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, status, user, ...data } = req.body;

  const categoryInDB = await Category.findById(data.category);

  data.name = data.name.toUpperCase();
  data.user = req.user._id;
  data.category = categoryInDB._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true })
    .populate('user', 'name')
    .populate('category', 'name');

  res.json({
    ok: true,
    product
  });
}

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true })
    .populate('user', 'name')
    .populate('category', 'name');

  res.json(product);
}

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
}
