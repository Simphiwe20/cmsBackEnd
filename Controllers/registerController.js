const register = require('../Models/register');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    addclient: async (req, res) => {
        // payload is the data from the front ents inputs 
        let payload = { ...req.body };
        console.log('New users', payload)
        // increpting the password
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(payload.password, salt, async (err, hash) => {
                try {
                    // Check if user exists
                    const _res = await register.findOne({ email: req.body.email })
                    if (!_res) {
                        // Store hash in your password DB.
                        payload['password'] = hash;

                        const newregister = new register(payload)
                        console.log(newregister)
                        const result = await newregister.save()
                        console.log('Results', result)
                        res.status(200).send(result)
                    }else {
                        res.send({Error: 'User already exists'})
                    }

                } catch (error) {
                    console.log(error)
                    res.status(500).send(error)
                }
            });
        });
    },
    getClients: async (req, res) => {
        try {
            let clients = await register.find()
            console.log('User found', clients)
            res.status(200).send(clients)
        }
        catch (err) {
            res.status(404).send(err)
            console.log(err)
        }
    },
    getclient: async (req, res) => {
        try {
            const result = await register.findOne(req.params);
            console.log(result)
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    }, signIn: async (req, res) => {
        try {
            // finding the user on the database
            const foundUser = await register.findOne({ email: req.body.email })
            // check if user exist
            if (foundUser) {

                // Load hash from your password DB.(Decrypt)
                bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
                    console.log(req.body.password)
                    if (result) {
                        console.log(result)
                        if (foundUser.status !== 'active') {
                            res.status(401).send({ Error: 'Your account seems to be disabled, please contact the administrator' })
                        } else {
                            res.status(200).send(foundUser)
                        }
                    }
                    else {
                        res.status(403).send({ Error: 'Password is incorrect' })
                    }
                });
                console.log('found User', foundUser)
            } else {
                res.status(403).send({ Error: 'User not Found' })
            }

        } catch (err) {
            res.status(403).send(err)
        }

    }, updateUser: async (req, res) => {
        try {
            const filter = { email: req.body.email }
            const options = { upsert: true }
            const updates = { $set: req.body }
            console.log(filter)
            const updatedUser = await register.updateOne(filter, updates, options)
            console.log(updatedUser)
            res.status(200).send(updatedUser)
        }
        catch {
            res.status(500).send("We ran into an error")
        }
    },checkPassword: async (req, res) => {
        console.log("req.body", req.body)
        // Checking matching password
        bcrypt.compare(req.body.plainPassword, req.body.hashedPassword, function (err, result) {
            res.send(result);
        });
    },
    updateUserPassword: async (req, res) => {
        try {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {

                    req.body.password = hash;
                    req.body.email = req.body.email.toLowerCase();

                    const filter = { email: req.body.email };
                    const options = { upsert: true };
                    const updateDoc = {
                        $set: req.body
                    };
                    const result = await register.updateOne(filter, updateDoc, options);
                    res.send(result)
                });
            });
        } catch (error) {
            res.status(500).send(error)
        }
    },
}