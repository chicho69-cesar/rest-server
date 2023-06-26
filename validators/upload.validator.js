const { param } = require('express-validator');
const { validateCollection } = require('../helpers/db-validator');

const updateCollectionPictureIdChain = () =>
  param('id')
    .notEmpty().withMessage('Id is required')
    .isMongoId().withMessage('Invalid id');

const updateCollectionPictureChain = () =>
  param('collection')
    .custom((value) => validateCollection(value, ['users', 'products']));

module.exports = {
  updateCollectionPictureIdChain,
  updateCollectionPictureChain
}
