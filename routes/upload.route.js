const { Router } = require('express');

const { uploadFiles, updatePicture } = require('../controllers/upload.controller');
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

module.exports = router;
