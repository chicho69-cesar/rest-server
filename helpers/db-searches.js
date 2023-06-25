const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

// Search user by name or email
const searchUsers = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: (user) ? [user] : []
    });
  }

  // Term without case sensitive
  const regex = new RegExp(term, 'i');

  // Logical operators in mongoose
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }]
  });

  res.json({
    results: users
  });
}

// Search categories by name
const searchCategories = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: (category) ? [category] : []
    });
  }

  const regex = new RegExp(term, 'i');
  const categories = await Category.find({
    name: regex,
    status: true
  });

  res.json({
    results: categories
  });
}

// Search products by name, description or category id
const searchProducts = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    let products = [];

    const product = await Product.findById(term)
      .populate('category', 'name');

    if (!product) {
      products = await Product.find({
        category: term,
        status: true
      }).populate('category', 'name');
    } else {
      products = [product];
    }

    return res.json({
      results: products
    });
  }

  const regex = new RegExp(term, 'i');
  const products = await Product.find({
    $or: [{ name: regex }, { desc: regex }],
    $and: [{ status: true }]
  }).populate('category', 'name');

  res.json({
    results: products
  });
}

// Search products by category
const searchProductsByCategory = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const products = await Product.find({
      category: term,
      status: true
    })
      .select('name desc price available')
      .populate('category', 'name');

    return res.json({
      results: products
    });
  }

  const regex = new RegExp(term, 'i');
  const categories = await Category.find({
    name: regex,
    status: true
  });

  if (categories.length === 0) {
    return res.json({
      results: []
    });
  }

  const products = await Product.find({
    $or: [...categories.map(cat => ({ category: cat._id }))],
    $and: [{ status: true }]
  })
    .select('name desc price available')
    .populate('category', 'name');

  res.json({
    results: products
  });
}

module.exports = {
  searchUsers,
  searchCategories,
  searchProducts,
  searchProductsByCategory
}
