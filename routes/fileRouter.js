const express = require('express');
const router = express.Router();
const {upload} = require('../middlewares/uploadMiddleware');
const {uploadFile, deleteFile, renameFile} = require('../controllers/fileControllers')
const {UPLOAD_FILE_ENDPOINT, DELETE_FILE_ENDPOINT, RENAME_FILE_ENDPOINT} = require('../constants/constants')

router.post(UPLOAD_FILE_ENDPOINT, upload.single('file'), uploadFile);
router.delete(DELETE_FILE_ENDPOINT, deleteFile);
router.put(RENAME_FILE_ENDPOINT, renameFile);

module.exports = router;