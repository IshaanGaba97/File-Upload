const multer = require('multer');
const storage = multer.memoryStorage();
const {ERROR_MIMETYPE} = require('../constants/constants')
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error(ERROR_MIMETYPE));
    }
  },
});

module.exports = {upload};


