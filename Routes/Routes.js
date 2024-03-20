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

// Get routes
router.get('/internal-users', cors(), internalUserController.getAllInternalUsers)
// Post routes
router.post('/add-internalUsers', internalUserController.storeInternalUser)

// Death claim request handling
router.post('/add-death-claim', deathClaimController.addDeathClaim)
router.get('/get-death-claims', deathClaimController.getDeathClaims)
router.put('/update-death-claim', deathClaimController.updateStatus)

// File Upload
router.post('/upload', upload.any(files), deathClaimController.uploadFile)
router.get('/download-files/:fileId', deathClaimController.downloadFile)
router.get('/get-all-files', deathClaimController.getAllFile)



// Property claim controlers
router.post('/add-property-claim', propertyClaimController.addpropertyClaim)
router.get('/', propertyClaimController.getpropertyClaim)

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

module.exports = router