const deathClaim = require('../Models/deathClaims')
const File = require('../Models/file');
const { Readable } = require("stream")
const mongoose = require("mongoose")
const multer = require('multer');

const deathId = `death-${new Date().getTime()}`;

let bucket;
mongoose.connection.on("open", () => {
    console.log('COONECTION RUNNING')
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
})


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = {
    getDeathClaims: async (req, res) => {
        try {
            let claims = await deathClaim.find()
            res.status(201).send(claims)
            console.log(claims)
        } catch {
            res.status(404).send(claims)
        }
    },
    addDeathClaim: async (req, res) => {
        const { attachment } = req
        const { Id } = req
        console.log(attachment)
        console.log(Id)

        try {
            let payload = { ...req.body }
            payload['commonId'] = deathId
            console.log(payload)
            const newClaim = new deathClaim(payload)
            console.log(newClaim)
            const result = await newClaim.save()
            console.log(result)
            res.status(201).send(result)
        } catch (err) {
            console.log(err)
            res.status(500).send('We ran into an error')
        }
    },
    updateStatus: async (req, res) => {
        try {
            let filter = {claimID: req.body.claimID}

            console.log(filter)
            let options = { upsert : true}

            let updateDoc = { $set: req.body}

            console.log(req.body)

            let result = await deathClaim.updateOne(filter, updateDoc, options)

            console.log(result)
            res.status(200).send(result)
 
        }catch {
            res.status(500).send('We ran into a problem')
        }
    },
    uploadFile: async (req, res) => {
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
                    commonId: deathId
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
    getAllFile: async (req, res) => {
        console.log('Getting a file')
        try {
            console.log('Getting a file')
            // Query the File collection to get all files
            const files = await File.find();

            // If no files found, return appropriate response
            if (!files || files.length === 0) {
                return res.status(404).json({ message: "No files found" });
            }
            // If files found, return them
            res.json({ files: files, message: "Files retrieved successfully" });
        } catch (error) {
            console.error("Error retrieving files:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    downloadFile: async (req, res) => {
        try {
            const fileId = req.params.fileId; // Assuming fileId is passed in the request parameters
            console.log('fileId ', fileId)
            // Find the file data in the database
            const fileData = await File.findOne({ fileId: fileId });

            console.log(fileData)
            // If file data not found, return appropriate response
            if (!fileData) {
                return res.status(404).json({ message: "File not found" });
            }

            // const bucket = // Access your GridFSBucket here

            // Create a readable stream from GridFS using the fileId
            const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
            console.log(downloadStream)

            // Handle stream errors
            downloadStream.on('error', (error) => {
                console.error("Error reading file:", error);
                res.status(500).json({ error: "Internal server error" });
            });

            // Check if the stream is readable
            if (!downloadStream.readable) {
                throw new Error('Download stream is not readable');
            }

            console.log(downloadStream)
            // Set the appropriate content type for the response
            res.set('Content-Type', fileData.contentType);

            // Set the appropriate content disposition header for the response (e.g., inline)
            res.setHeader('Content-Disposition', 'inline');

            // Pipe the download stream to the response
            downloadStream.pipe(res);
        } catch (error) {
            console.error("Error reading file:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
}