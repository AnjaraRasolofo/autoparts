//Imports
const Category = require('../models/category');

//Routes
module.exports = {
    createCategory: (req, res) => {
        const newCategory = new Category({
            name: req.body.name,
            description: req.body.description
        });
        newCategory.save()
        .then((newCategory) => {
            return res.status(201).json(`[${newCategory.name}] was created`);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot add category'});
        });
    },
    getCategory: (req, res) => {
        const id = req.params.id;
        Category.findById(id)
        .then((category) => {
            return res.status(200).json(category);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    getCategories: (req, res) => {
        Category.find()
        .then((categories) => {
            return res.status(200).json(categories);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    updateCategory: (req, res) => {
        const id = req.params.id;
        Category.updateOne({_id: id},{
            name: req.body.name,
            description: req.body.description
        })
        .then((updatedCategory) => {
            res.status(201).json(updatedCategory);     
        })
        .catch((error)=>{
            rconsole.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot update Category'});
        }); 
    },
    deleteCategory: (req, res) => {
        const id = req.params.id;
        Category.deleteOne({_id: id})
        .then((category)=>{
            res.status(204).json({'message':'category has been deleted'}); 
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot delete Category'});
        })
    }
}