const multer = require('multer')
const checkFileType = require('../utils/checkFileType')

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})
