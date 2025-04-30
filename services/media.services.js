const imagekit = require("imagekit");
const { App_Config } = require("../configs/app.config");
const { IMAGEKIT_INSTANCE,
    IMAGEKIT_URL_ENDPOINT,
    IMAGEKIT_PRIVATEKEY,
    IMAGEKIT_PUBLICKEY
} = App_Config

// image kit instance 
const imagekitInstance = new imagekit({
    publicKey: IMAGEKIT_PUBLICKEY,
    privateKey: IMAGEKIT_PRIVATEKEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT
})


async function upload({ files }) {
    try {
        if (Array.isArray(files)) {
            const promises = files.map(async (file) => {
                const response = await imagekitInstance.upload({
                    file: file.file,
                    fileName: file.fileName
                })
                return response.fileId;
            })
            const fileIds = await Promise.all(promises);
            return { fileIds };
        } else {
            const response = await imagekitInstance.upload({
                file: files.src,
                fileName: files.fileName
            })
            const fileId = responce.fileId;
            return { fileId };
        }

    } catch (error) {
        console.log({
            info: "Error While Uploading",
            error,
            Message: error.Message
        })
    }
}


async function download({ fileId }) {
    try {
        const fileDetails = await imagekitInstance.getFileDetails(fileId);
        const fileURL = fileDetails.url;
        return { downloadFile: fileURL }; // Fixed typo
    } catch (error) {
        console.error({
            Info: "Error While Downloading",
            error,
            Message: error.message 
        });
        throw new Error("Failed to download file. Please check the file ID."); // Throw error for caller
    }
}





module.exports.uploadServices = {
    upload,
    download
}


