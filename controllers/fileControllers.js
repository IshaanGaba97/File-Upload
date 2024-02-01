const File = require('../models/fileModel');
const { INTERNAL_SERVER_ERROR, NO_FILE_UPLOADED, INVALID_FILE_ID, FILE_NOT_FOUND, FILE_DELETED_SUCCESSFULLY, NEW_NAME_REQUIRED, FILE_RENAMED_SUCCESSFULLY, ERROR_UPLOADING_FILE, ERROR_DELETING_FILE, ERROR_RENAMING_FILE } = require("../constants/constants");

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: NO_FILE_UPLOADED });
        }

        const fileId = Math.random().toString(36).substring(7);

        const file = new File({
            fileId,
            originalName: req.file.originalname,
            data: req.file.buffer,
        });

        await file.save();

        return res.status(200).json({ fileId });
    } catch (error) {
        console.error(ERROR_UPLOADING_FILE, error);
        return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
};


const deleteFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        if (!fileId) {
            return res.status(400).json({ error: INVALID_FILE_ID });
        }

        const deletedFile = await File.findOneAndDelete({ fileId });

        if (!deletedFile) {
            return res.status(404).json({ error: FILE_NOT_FOUND });
        }

        return res.status(200).json({ message: FILE_DELETED_SUCCESSFULLY });
    } catch (error) {
        console.error(ERROR_DELETING_FILE, error);
        return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
};

const renameFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const newName = req.body.newName;

        if (!fileId) {
            return res.status(400).json({ error: INVALID_FILE_ID });
        }

        if (!newName) {
            return res.status(400).json({ error: NEW_NAME_REQUIRED });
        }

        const updatedFile = await File.findOneAndUpdate({ fileId }, { originalName: newName }, { new: true });
        console.log(updatedFile);
        if (!updatedFile) {
            return res.status(404).json({ error: FILE_NOT_FOUND });
        }

        return res.status(200).json({ message: FILE_RENAMED_SUCCESSFULLY });
    } catch (error) {
        console.error(ERROR_RENAMING_FILE, error);
        return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
};


module.exports = { uploadFile, deleteFile, renameFile };