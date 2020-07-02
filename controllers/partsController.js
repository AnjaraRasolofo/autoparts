//Imports
const Part = require('../models/part');

//Routes
module.exports = {
    createPart: (req, res) => {
        const newPart = new Part({
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            image: req.body.image,
            category: req.body.categoryId 
        });
        newPart.save()
        .then((newPart) => {
            return res.status(201).json(`[${newPart.name}] was created`);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot add category'});
        });
    },
    getPart: (req, res) => {
        const id = req.params.id;
        Part.findById(id).populate('category')
        .then((part) => {
            if(part !== null) res.status(200).json(part);
            else res.status(200).json({'message':'no part data in the database'});
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    getParts: (req, res) => {
        Part.find().populate('category')
        .then((parts) => {
            if(parts.length > 0) res.status(200).json(parts);
            return res.status(200).json({'message':'no parts data in the database'})
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    updatePart: (req, res) => {
        const id = req.params.id;
        Part.updateOne({_id: id},{
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            image: req.body.image,
        })
        .then((updatedPart) => {
            res.status(201).json(updatedPart);     
        })
        .catch((error)=>{
            rconsole.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot update Category'});
        }); 
    },
    deletePart: (req, res) => {
        const id = req.params.id;
        Part.deleteOne({_id: id})
        .then((part)=>{
            res.status(204).json({'message':`[${part}] has been deleted` }); 
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot delete Category'});
        })
    }
}