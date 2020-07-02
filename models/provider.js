var mongoose = require('../config/db');

var providerSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, 
    address: {
       type: String,
       required: true
    },
    email: String,
    phoneNumber: {
        type: String,
        required: true
    }   
}); 

module.exports = mongoose.model('Provider', providerSchema);