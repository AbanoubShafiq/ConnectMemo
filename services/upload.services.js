const imagekit = require("imagekit");
const app_config = require("./../configs/App_Config");
const { IMAGEKIT_INSTANCE,
    IMAGEKIT_URL_ENDPOINT,
    IMAGEKIT_PRIVATEKEY,
    IMAGEKIT_PUBLICKEY
} = app_config




// image kit instance 
const imagekitInstance = new imagekit({
    publicKey: IMAGEKIT_PUBLICKEY,
    privateKey: IMAGEKIT_PRIVATEKEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT
})


async function upload({ files }) {
    try {
        if (Array.isArray(files)) {
            const promises = [];
            for (const file in files) {
                promises.push(
                    imagekitInstance.upload({
                        file: file.src,
                        fileName: file.fileName
                    })
                )
            }
            Promise.all(promises);
            return { message: "success" };
        } else {
            await imagekitInstance.upload({
                file: files.src,
                fileName: files.fileName
            })
            return { message: "success" };
        }
        const responce = await imagekitInstance.upload({
            file,
            fileName
        })
        return responce;

    } catch (error) {
        console.log({
            info: "Error While Uploading",
            error,
            Message: error.Message
        })
    }
}


module.exports.uploadServices = {
    upload
}


