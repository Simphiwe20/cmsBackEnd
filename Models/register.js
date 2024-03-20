const mongoose = require('mongoose');


const Address = new mongoose.Schema({
    streetName: { type: String, required: true },
    streetNumber: { type: Number, required: true },
    city: { type: String, required: true },
    code: { type: Number, required: true }
})

const register = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    idNumber: { type: Number, required: true, index: { unique: false } },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    address: Address,
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    cellNumber: { type: String, required: true },
    startDate: { type: String, required: true },
    memberID: { type: String, required: false },
    employeeID: { type: String, required: false },
    status: { type: String, required: false },
    role: { type: String, required: true }
})



module.exports = mongoose.model('register', register);