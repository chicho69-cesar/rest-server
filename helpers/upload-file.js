const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, folder = '', validExtensions = ['png', 'jpg', 'jpeg', 'gif']) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const nameSplitted = file.name.split('.');
    const extension = nameSplitted[nameSplitted.length - 1];

    // Validate extension
    if (!validExtensions.includes(extension)) {
      return reject(`The extension ${extension} is not a valid extension - ${validExtensions}`);
    }

    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      resolve({
        path: uploadPath,
        name: tempName
      });
    });
  });
}

module.exports = {
  uploadFile
}
