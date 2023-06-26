const dbSearches = require('./db-searches');
const dbValidators = require('./db-validator');
const generateJWT = require('./generate-JWT');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
  ...dbSearches,
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...uploadFile
}
