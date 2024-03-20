const mongoose = require('mongoose')


const client = new mongoose.Schema({
      firstName: {type: String, require: true},
      lastName: {type: String, require: true},
      email: {type: String, require: true, index : { unique: true }},
      cellPhone: {type: Number, require: true},
      memberID: {type: Number, require: true},
      idNumber: {type: Number, require: true},
      DOB: {type: Date, require: true},
      gender: {type: String, require: true},
      startDate: {type: Date, require: true}
})

module.exports = mongoose.model('client', client)