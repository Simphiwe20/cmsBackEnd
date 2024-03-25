const mongoose = require('mongoose')

witness = {
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    cellPhoneNo: {type: String, require: true},
    email: {type: String, require: true}
  }

const publicLiabilityClaim = mongoose.Schema({
    thirdPatryFullName:{type: String, require: true},
    thirdPartyEmail:{type: String, require: true},
    thirdPartyCellPhone: {type: String, require: true},
    incidentDate: {type: String, require: true},
    incidentTime: {type: String, require: true},
    incidentLocation: {type: String, require: true},
    awareDate: {type: String, require: true},
    incidentDetails: {type: String, require: true},
    incidentCause: {type: String, require: true},
    previousIncident: {type: String, require: true},
    injuryDetail: {type: String, require: true},
    thirdPartConditions: {type: String, require: true},
    propertyOwner: {type: String, require: true},
    contactDetails: {type: String, require: true},
    damageDetails: {type: String, require: true},
    propertyCar: {type: String, require: true},
    witnesses: [witness],
    hasInsuredInv: {type: String, require: true},
    insuredComment: {type: String, require: true},
    insuredOnAmount: {type: String, require: true},
    externalContributor: {type: String, require: true},
    additionalDetails: {type: String, require: true},
    memberID: { type: String, required: true },
    commonId: { type: String, required: true },
    dateSubmitted: { type: Date, required: true },
    status: { type: String, required: true },
    claimID: { type: String, required: true },
    submittedBy: { type: String, required: true },
})

module.exports = mongoose.model('publicLiabilityClaim', publicLiabilityClaim)