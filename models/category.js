var mongoose = require('../config/db');

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, 
    description: String   
}); 

module.exports = mongoose.model('Category', categorySchema);