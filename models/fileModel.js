// models/fileModel.js
const mongoose = require('mongoose');

const File = mongoose.model('File', {
  fileId: String,
  originalName: String,
  data: Buffer,
});

module.exports = File;
