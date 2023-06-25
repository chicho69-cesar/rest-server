const { request, response } = require('express');

const { Category } = require('../models');

// Get all categories - paginated - total - populate
const getCategories = async (req = request, res = response) => {
  const queryParams = req.query;
  const { offset = 0, limit = 10 } = queryParams;

  const query = {
    status: true
  };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(offset)
      .limit(limit)
  ]);

  res.json({
    total,
    categories
  });
}

// Get a category by id - populate
const getCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id)
    .populate('user', 'name');

  res.json(category);
}

// Create a category with the name in Uppercase
const postCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryInDB = await Category.findOne({ name });

  if (categoryInDB) {
    return res.status(400).json({
      msg: `Category ${categoryInDB.name} already exists`
    });
  }

  // Generate the data to save
  const data = {
    name,
    user: req.user._id
  };

  // Save in DB
  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
}

// Update category - name in Uppercase
const putCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true })
    .populate('user', 'name');

  res.json({
    ok: true,
    category
  });
}

// Delete a category by id - state: false
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true })
    .populate('user', 'name');

  res.json(category);
}

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
}
