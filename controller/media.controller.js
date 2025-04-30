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

    router.get("/download", async (req, res) => {
        try {
            const id = req.query.id;
    
            if (!id) {
                return res.status(400).send("No ID provided for download");
            }
    
            const downloadURL = await uploadServices.download({ fileId: id });
    
            if (!downloadURL) {
                return res.status(404).send("No image found with the provided ID");
            }
    
            return res.status(200).send({ DownloadURL: downloadURL.downloadFile });
        } catch (error) {
            console.error("Error in /download route:", error.message);
            return res.status(500).send("Internal Server Error. Please try again.");
        }
    });
    



    return router;
})()


