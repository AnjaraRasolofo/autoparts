var mongoose = require('../config/db');

var entryRowsSchema = mongoose.Schema({
    //id: mongoose.Schema.Types.ObjectId,
    part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part'
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    },
    quantity: Number,
    buyingPrice: Number 
});
const EntryRows = mongoose.model('EntryRows', entryRowsSchema);
module.exports = EntryRows;

var entrySchema = mongoose.Schema({
    entryRef: String,
    entryDate: Date,
    buyer: String,
    rows: [entryRowsSchema]
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;