const mongoose = require('mongoose')


const internalUser = new mongoose.Schema({
      firstName: {type: String, require: true},
      lastName: {type: String, require: true},
      email: {type: String, require: true, index : { unique: true }},
      cellPhone: {type: Number, require: true},
      employeeID: {type: Number, require: true},
      idNumber: {type: Number, require: true},
      DOB: {type: Date, require: true},
      gender: {type: String, require: true},
      role: {type: String, require: true},
})

module.exports = mongoose.model('internalUser', internalUser)