const path = require("path");
module.exports.imageKitPayloadbuilder = (expressUploadedFile) => {
    const originalExtention = path.extname(expressUploadedFile.name);
    const originalName = path.basename(expressUploadedFile.name, originalExtention);
    const newFileName = originalName+originalExtention;

    return {
        file: expressUploadedFile.data,
        fileName: newFileName
    }
}