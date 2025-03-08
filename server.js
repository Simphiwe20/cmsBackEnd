// Importing express
const express = require('express')
// Create an an express app
const app = express()
// Import mongoose which is used to connect to the database
const mongoose = require('mongoose')
// import cors
const cors = require('cors')
const nodemailer = require("nodemailer");


// Enable cors to allow cross origin resource sharing
app.use(cors()) 


// Import the middleware
app.use(express.urlencoded({extended: true}))

app.use(express.json())

// Import routes
const routes = require('./Routes/Routes')
app.use(routes)

// Get a port from process environment or use 3000 as default
const PORT = process.env.PORT || 3000

// Connect to the database
mongoose.connect('mongodb+srv://gsimphiwe212:9F0979NVnYw2bspd@cms-db.rpofb.mongodb.net/?retryWrites=true&w=majority&appName=cms-db')
        .then((res) => console.log('Connection successfully'))
        .catch((err) => console.log('We have ran into an error, while connecting...'))


app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})


const sendPassword = (req) => {
    
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gsimphiwe212@gmail.com',
            pass: 'kkdvatjekgzlwrvr'
        }
    })

    let details = {
        from: 'gsimphiwe212@gmail.com',
        to: `${req.body.email}`,
        subject: 'Account',
        text: `Hey ${req.body.firstName} ${req.body.lastName}, your user account has been successfully created and your password is ${req.body.password}. Use your email address and this password to log in.`
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log('It has an error', err)
        } else {
            console.log('Messege send successfully')
        }
    })
}


app.post('/sendPassword', (req, res) => {
    if(req) {
        sendPassword(req)
        res.send('Password Sent successfully')
        console.log(req.body)
    }
})

const sendNewPassword = (req) => {
    
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gsimphiwe212@gmail.com',
            pass: 'kkdvatjekgzlwrvr'
        }
    })

    let details = {
        from: 'gsimphiwe212@gmail.com',
        to: `${req.body.email}`,
        subject: 'New Password',
        text: `Hey ${req.body.firstName} ${req.body.lastName}, This is your new passsword ${req.body.password}. Use your email address and this password to log in.`
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log('It has an error', err)
        } else {
            console.log('Messege send successfully')
        }
    })
}

app.post('/sendNewPassword', (req, res) => {
    if(req) {
        sendNewPassword(req)
        res.send(JSON.stringify('Password Sent successfully'))
        console.log(req.body)
    }
})

