const path = require('node:path');
const fs = require('node:fs');
const { request, response } = require('express');
const cloudinary = require('cloudinary').v2;

const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFiles = async (req = request, res = response) => {
  try {
    // const response = await uploadFile(req.files, 'texts', ['md', 'txt']);
    const response = await uploadFile(req.files, 'images', undefined);
    const { name } = response;

    res.json({ name });
  } catch (error) {
    return res.status(400).json({
      msg: error
    });
  }
}

const updatePicture = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not exists a user with id: ${id}`
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not exists a product with id: ${id}`
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `There is not exists ${collection}`
      });
  }

  // Clean prev images
  try {
    if (model.img) {
      // Delete the prev image from the server
      const pathImg = path.join(__dirname, '../uploads', collection, model.img);
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `There is an error deleting the prev image`
    });
  }

  const { name } = await uploadFile(req.files, collection, undefined);
  model.img = name;

  await model.save();

  res.json(model);
}

const showImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;
  const noImagePath = path.join(__dirname, '../assets/no-image.jpg');

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) return res.sendFile(noImagePath);
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) return res.sendFile(noImagePath);
      break;

    default:
      return res.sendFile(noImagePath);
  }

  try {
    if (model.img) {
      const pathImg = path.join(__dirname, '../uploads', collection, model.img);
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `There is an error getting the image`
    });
  }

  res.sendFile(noImagePath);
}

const updatePictureCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not exists a user with id: ${id}`
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not exists a product with id: ${id}`
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `There is not exists ${collection}`
      });
  }

  // Clean prev images
  try {
    if (model.img) {
      // Delete the prev image from cloudinary
      const nameArr = model.img.split('/');
      const name = nameArr[nameArr.length - 1];
      const [public_id] = name.split('.');

      cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `There is an error deleting the prev image`
    });
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  res.json(model);
}

module.exports = {
  uploadFiles,
  updatePicture,
  showImage,
  updatePictureCloudinary
}
