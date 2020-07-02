//Imports
const Provider = require('../models/provider');

//Routes
module.exports = {
    createProvider: (req, res) => {
        const newProvider = new Provider({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        });
        newProvider.save()
        .then((newProvider) => {
            return res.status(201).json(`[${newProvider.name}] was created`);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot add category'});
        });
    },
    getProvider: (req, res) => {
        const id = req.params.id;
        Provider.findById(id)
        .then((provider) => {
            if(provider !== null) res.status(200).json(provider);
            else res.status(200).json({'message':'no provider data in the database'});
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    getProviders: (req, res) => {
        Provider.find()
        .then((providers) => {
            if(providers.length > 0) res.status(200).json(providers);
            return res.status(200).json({'message':'no providers data in the database'})
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    updateProvider: (req, res) => {
        const id = req.params.id;
        Provider.updateOne({_id: id},{
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
        .then((updatedProvider) => {
            res.status(201).json(updatedProvider);     
        })
        .catch((error)=>{
            rconsole.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot update Provider'});
        }); 
    },
    deleteProvider: (req, res) => {
        const id = req.params.id;
        Provider.deleteOne({_id: id})
        .then((provider)=>{
            res.status(204).json({'message':'provider has been deleted'}); 
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot delete Provider'});
        })
    }
}