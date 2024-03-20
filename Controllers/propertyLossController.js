const propertyClaim = require('../Models/propLossClaims')
const File = require('../Models/file');
const { Readable } = require("stream")
const mongoose = require("mongoose")
const multer = require('multer');

module.exports = {
    getpropertyClaim: async (req, res) => {
        res.send('Request received')
    },
    addpropertyClaim: async (req, res) => {
        try {

            console.log(req.body)
            let newClaim = propertyClaim(req.body)
            console.log(newClaim)
            let result = newClaim.save()
            res.status(201).send(result)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }, uploadFile: async (req, res) => {
        try {
            const files = req.files;
            console.log(files)
            const promises = files.map(async (file, index) => {
                const { originalname, mimetype, buffer } = file;
                const uploadStream = bucket.openUploadStream(originalname);
                const readableStream = new Readable();
                readableStream.push(buffer);
                readableStream.push(null);
                readableStream.pipe(uploadStream);
                const fileData = new File({
                    filename: originalname,
                    contentType: mimetype,
                    size: buffer.length,
                    fileId: uploadStream.id,
                    commonId: pictureId
                });
                await fileData.save();
                return fileData;
            });
            const results = await Promise.all(promises);
            res.send({ files: results, message: "Files uploaded successfully" });
        }
        catch (error) {
            console.log('Error', error);
            res.status(500).send('Error uploading files');
        }
    },
    getFile: (req, res) => {
        const { id } = req.params;
        let downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id))
        downloadStream.on("file", (file) => {
            res.set("Content-Type", file.contentType)
        })
        downloadStream.pipe(res)
    },
}