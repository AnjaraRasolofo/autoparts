var mongoose = require('../config/db');

var customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    address: String,
    email: String,
    phoneNumber: {
        type: String,
        required: true
    }   
}); 

module.exports = mongoose.model('Customer', customerSchema);