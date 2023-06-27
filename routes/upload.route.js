const { Router } = require('express');

const { uploadFiles, updatePicture, showImage, updatePictureCloudinary } = require('../controllers/upload.controller');
const { validateFile, validateFields } = require('../middlewares');
const {
  updateCollectionPictureIdChain,
  updateCollectionPictureChain
} = require('../validators/upload.validator');

const router = Router();

router.post('/', [
  validateFile,
  validateFields
], uploadFiles);

router.put('/:collection/:id', [
  validateFile,
  updateCollectionPictureIdChain(),
  updateCollectionPictureChain(),
  validateFields
], updatePicture);

router.get('/:collection/:id', [
  updateCollectionPictureIdChain(),
  updateCollectionPictureChain(),
  validateFields
], showImage);

router.put('/cloudinary/:collection/:id', [
  validateFile,
  updateCollectionPictureIdChain(),
  updateCollectionPictureChain(),
  validateFields
], updatePictureCloudinary);

module.exports = router;
