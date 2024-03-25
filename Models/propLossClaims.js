const mongoose = require('mongoose')


lossDetails = {
      dateTime: {type: String, require: true},
      discoveryTime: {type: String, require: true},
      location: {type: String, require: true},
      lossState: {type: String, require: true},
      premises: {type: String, require: true},
      byWhom: {type: String, require: true},
      lastOccuppied:{type: String, require: true}, 
      forceEntry: {type: String, require: true},
      forcedDetails: {type: String, require: true},
      evidence: {type: String, require: true},
      alarmActivation: {type: String, require: true},
      alarmCompany: {type: String, require: true}
}

item = {
    itemNum: {type: String, require: true},
    make: {type: String, require: true},
    purchaseLocation: {type: String, require: true},
    value: {type: String, require: true}
}

propertyLossClaim = new mongoose.Schema({
    lossDetails: lossDetails,
    items: [item],
    memberID: { type: String, required: true },
    commonId: { type: String, required: true },
    dateSubmitted: { type: Date, required: true },
    status: { type: String, required: true },
    claimID: { type: String, required: true },
    submittedBy: { type: String, required: true },
})

module.exports = mongoose.model('propertyLossClaim', propertyLossClaim)