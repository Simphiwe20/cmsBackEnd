const client = require('../Models/clients')

module.exports = {
    getAllClient: async (req, res) => {
        try {
        let clients = await client.find()
        console.log('Client Founrd', clients)
        res.status(200).send(clients)
        }
        catch(err) {
            res.status(404).send(err)
            console.log(err)
        }
    },
    addClients: async (req, res) => {
        try {
            console.log(req.body)
            let newClient = client(req.body)
            let _res = newClient.save()
            console.log(_res)
            res.status(201).send('Clients has been stored')
        }catch {
            res.status(401).send('We ran into a problem')
        }
    },
    getclient: async (req, res)=>{
        try {
            console.log(req.body)
            const result = await client.findOne( req.body );
            console.log('Res', result)            
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
}