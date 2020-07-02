//Imports
const Customer = require('../models/customer');

//Routes
module.exports = {
    createCustomer: (req, res) => {
        const newCustomer = new Customer({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        });
        newCustomer.save()
        .then((newCustomer) => {
            return res.status(201).json(`[${newCustomer.name}] was created`);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot add category'});
        });
    },
    getCustomer: (req, res) => {
        const id = req.params.id;
        Customer.findById(id)
        .then((customer) => {
            if(customer !== null) res.status(200).json(customer);
            else res.status(200).json({'message':'no customer data in the database'});
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    getCustomers: (req, res) => {
        Customer.find()
        .then((customers) => {
            if(customers.length > 0) res.status(200).json(customers);
            return res.status(200).json({'message':'no customers data in the database'})
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    updateCustomer: (req, res) => {
        const id = req.params.id;
        Customer.updateOne({_id: id},{
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
        .then((updatedCustomer) => {
            res.status(201).json(updatedCustomer);     
        })
        .catch((error)=>{
            rconsole.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot update Customer'});
        }); 
    },
    deleteCustomer: (req, res) => {
        const id = req.params.id;
        Customer.deleteOne({_id: id})
        .then((customer)=>{
            res.status(204).json({'message':'customer has been deleted'}); 
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot delete Customer'});
        })
    }
}