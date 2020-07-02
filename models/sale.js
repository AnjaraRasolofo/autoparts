var mongoose = require('../config/db');

var rowsSchema = mongoose.Schema({
    part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part'
    },
    quantity: Number,
    price: Number 
});
const Rows = mongoose.model('Rows', rowsSchema);
module.exports = Rows;

var saleSchema = mongoose.Schema({
    saleRef: String,
    saleDate: Date,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    rows: [rowsSchema]
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
