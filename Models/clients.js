const mongoose = require('mongoose')

const Address = new mongoose.Schema({
      streetName: { type: String, required: true },
      streetNumber: { type: Number, required: true },
      suburb: { type: String, required: true },
      city: { type: String, required: true },
      code: { type: Number, required: true }
  })

const client = new mongoose.Schema({
      firstName: {type: String, require: true},
      lastName: {type: String, require: true},
      email: {type: String, require: true, index : { unique: true }},
      cellPhone: {type: Number, require: true},
      memberID: {type: Number, require: true},
      address: Address,
      idNumber: {type: Number, require: true, index : { unique: true }},
      DOB: {type: Date, require: true},
      gender: {type: String, require: true},
      startDate: {type: Date, require: true}
})

module.exports = mongoose.model('client', client)