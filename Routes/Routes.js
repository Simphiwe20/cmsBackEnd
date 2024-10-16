const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage })
let files = [{ name: 'file1', maxCount: 1}, { name: 'file2', maxCount: 1 }]

const internalUserController = require('../Controllers/internalUserController')
const deathClaimController = require('../Controllers/deathClaimController')
const propertyClaimController = require('../Controllers/propertyLossController')
const clientController = require('../Controllers/clientController')
const registerController = require('../Controllers/registerController')
const publicClaimController = require('../Controllers/publicLiabityClaim');

// Get routes
router.get('/internal-users', cors(), internalUserController.getAllInternalUsers)
// Post routes
router.post('/add-internalUsers', internalUserController.storeInternalUser)

// Death claim request handling
router.post('/add-death-claim', deathClaimController.addDeathClaim)
router.get('/get-death-claims', deathClaimController.getDeathClaims)
router.put('/update-death-claim', deathClaimController.updateStatus)

// File Upload
router.post('/upload-death-files', upload.any(files), deathClaimController.uploadFile)
router.post('/upload-public-files', upload.any(files), publicClaimController.uploadFile)
router.post('/upload-prop-files', upload.any(files), propertyClaimController.uploadFile)
router.get('/download-files/:fileId', deathClaimController.downloadFile)
router.get('/get-all-files', deathClaimController.getAllFile) 

// Property claim controlers
router.post('/add-property-claim', propertyClaimController.addpropertyClaim)
router.get('/get-prop-claims', propertyClaimController.getpropertyClaim)
router.put('/update-prop-claim', propertyClaimController.updateStatus)

router.post('/upload', propertyClaimController.uploadFile)
// Clients controllers
router.get('/get-clients', clientController.getAllClient)
router.post('/add-client', clientController.addClients)
router.post('/get-client', clientController.getclient)

// Register User controllers
router.post('/add-user', registerController.addclient);
router.post('/get-users', registerController.getclient)
router.get('/get-all-users', registerController.getClients)
router.post('/log-in', registerController.signIn)
router.put('/updates-user', registerController.updateUser)
// password
router.post('/checkPassword', registerController.checkPassword)
router.post('/update-user-password', registerController.updateUserPassword)

// Public Liability Routes
router.post('/add-public-claim', publicClaimController.addPublicClaim)
router.get('/get-public-claims', publicClaimController.getpublicClaim)
router.put('/update-public-claim', publicClaimController.updateStatus)


module.exports = router