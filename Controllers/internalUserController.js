const internalUser = require('../Models/internalUsers')

module.exports = {
    getAllInternalUsers: async (req, res) => {
        console.log('get users...')
        try {
            let users = await internalUser.find()
            console.log(users)
            res.status(200).send(users)
        }catch {
            res.status(500).send('Sorry we ran into an error')
        }
    },
    storeInternalUser: async (req, res) => {
        try {

            let newUser = internalUser(req.body)
            let result = await newUser.save()
            console.log(result)
            res.status(201).send(result)
        }catch {
            res.status(501).send('Sorry, we ran into an error')

        }
    }   
}
