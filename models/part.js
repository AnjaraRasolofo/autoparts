var mongoose = require('../config/db');

var partSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    description: String,
    stock: Number,
    price: Number,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Part', partSchema);