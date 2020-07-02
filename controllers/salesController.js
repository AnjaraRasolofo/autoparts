//Imports
const Sale = require('../models/sale');

//Routes
module.exports = {
    buy: (req, res) => {
        const newSale = new Sale({
            saleDate: req.body.saleDate,
            saleRef: req.body.saleRef,
            client: req.body.client,
        });
        for(var i in req.body.rows) {
            const newRow = {
                part: req.body.rows[i].part,
                quantity: req.body.rows[i].quantity,
                price: req.body.rows[i].price
            };
            newSale.rows.push(newRow);
        }
        newSale.save()
        .then((newSale) => {
            return res.status(201).json(`[${newSale.saleRef}] was created`);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot add entry'});
        });
    },
    getSale: (req, res) => {
        const id = req.params.id;
        Sale.findById(id).populate("client")
        .then((sale) => {
            return res.status(200).json(sale);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    getSales: (req, res) => {
        const id = req.params.id;
        Sale.find().populate("client")
        .then((sales) => {
            return res.status(200).json(sales);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    }

}