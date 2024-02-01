//Constants.js file will contain the constants 
module.exports = {
    // endpoint 
    UPLOAD_FILE_ENDPOINT: "/upload",
    DELETE_FILE_ENDPOINT: "/delete-file/:fileId",
    RENAME_FILE_ENDPOINT: "/rename-file/:fileId",

    //mongo success msgs
    MONGODB_SUCCESS: "MongoDB connected successfully",

    // response messages
    NO_FILE_UPLOADED: "No file uploaded",
    INVALID_FILE_ID: "Invalid fileId",
    FILE_NOT_FOUND: "File not found",
    FILE_DELETED_SUCCESSFULLY: "File deleted successfully",
    NEW_NAME_REQUIRED: "New name is required",
    FILE_RENAMED_SUCCESSFULLY: "File renamed successfully",
    INTERNAL_SERVER_ERROR: "Internal Server Error",

    // Error messages for file operations
    ERROR_UPLOADING_FILE: "Error uploading file",
    ERROR_DELETING_FILE: "Error deleting file",
    ERROR_RENAMING_FILE: "Error renaming file",

    ERROR_MIMETYPE:'Only JPEG/PNG files are allowed'
}
