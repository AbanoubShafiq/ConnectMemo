const {request, response} = require("express");
const path = require("path");
const {uploadServices} = require("./../services/media.services");
const {imageKitPayloadbuilder} = require("./../uility/media.utils");


/**
* @param {request} req
* @param {response} res
*/




module.exports = (() => {
    const router = require("express").Router();
    router.post("/upload", async (req, res, next) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send("No files were uploaded.");
            }
            const payload = [];
            const uploadedFile = req.files.iti;
            if (Array.isArray(uploadedFile))
            {
                for(const expressUpload of uploadedFile)
                {
                    const {file, fileName} = imageKitPayloadbuilder(expressUpload);
                    payload.push({
                        file, fileName
                    })    
                }
            }else 
            {
                const {file, fileName} = imageKitPayloadbuilder(uploadedFile);
                payload.push({
                    file,
                    fileName
                })
            }
            const response = await uploadServices.upload({
                files: payload
            });
            res.send(response);
        } catch (error) {
            console.error('Error during file upload:', error);
            res.status(500).send({ error: 'An error occurred during the upload.' });
        }
    })


    // router.get("/download", async (req, res, next) => {
    //     if (!req.fileId)
    //     {
    //         return res.status(400).send("No Id To Download");
    //     }
    // })
    return router;
})()


