//Imports
const Entry = require('../models/entry');

//Routes
module.exports = {
    addEntry: (req, res) => {
        const newEntry = new Entry({
            entryDate: req.body.entryDate,
            entryRef: req.body.entryRef,
            buyer: req.body.buyer,
        });
        for(var i in req.body.rows) {
            const newRow = {
                part: req.body.rows[i].part,
                provider: req.body.rows[i].provider,
                quantity: req.body.rows[i].quantity,
                buyingPrice: req.body.rows[i].buyingPrice
            };
            newEntry.rows.push(newRow);
        }
        newEntry.save()
        .then((newEntry) => {
            return res.status(201).json(`[${newEntry.entryRef}] was created`);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred. Cannot add entry'});
        });
    },
    getEntry: (req, res) => {
        const id = req.params.id;
        Entry.findById(id).populate({
            path: 'rows',
            populate: {
                path: 'part',
                select: 'name',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            }
        }).populate({
            path: 'rows',
            populate: {
                path: 'provider',
                select: 'name'
            }
        })
        .then((entry) => {
            return res.status(200).json(entry);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    },
    getEntries: (req, res) => {
        const id = req.params.id;
        Entry.find().populate({
            path: 'rows',
            populate: {
                path: 'part',
                select: 'name',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            }
        }).populate({
            path: 'rows',
            populate: {
                path: 'provider',
                select: 'name'
            }
        })
        .then((entries) => {
            return res.status(200).json(entries);
        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({'message':'An error has occurred.'});
        })
    }
}