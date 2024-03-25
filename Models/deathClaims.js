const mongoose = require('mongoose')

deceasedDetails = {
    fullName: { type: String, require: true },
    idNum: { type: Number, require: true },
    deathDate: { type: String, require: true },
    deathCause: { type: String, require: true },
    certifiedPer: { type: String, require: true },
    telPhone: { type: Number, require: true },
    deathPlace:  { type: String, require: true },
    admissionNo: { type: String, require: true },
    Other: { type: String, require: true }
}
undertakerDetails = {
    companyName: { type: String, require: true },
    companyNo: { type: String, require: true },
    businessAddress: { type: String, require: true },
    cellNo: { type: String, require: true },
    burialDate: { type: Date, require: true },
    burialPlace: { type: String, require: true }
}

deceasedID = {
    filename: { type: String, required: true },
    id: { type: String, required: true },
    contentType: { type: String, required: true },
    fileId: { type: String, required: true },
    length: { type: Number, required: true }
} 

dearthCert = {
    filename: { type: String, required: true },
    id: { type: String, required: true },
    contentType: { type: String, required: true },
    fileId: { type: String, required: true },
    length: { type: Number, required: true }
} 

deathClaim = new mongoose.Schema({
    deceasedDetails: deceasedDetails,
    undertakerDetails: undertakerDetails,
    memberID: { type: String, required: true },
    commonId: { type: String, required: true },
    dateSubmitted: { type: Date, required: true },
    status: { type: String, required: true },
    claimID: { type: String, required: true },
    submittedBy: { type: String, required: true },
    reason: {type: String, required: false}
})

module.exports = mongoose.model('deathClaim', deathClaim)