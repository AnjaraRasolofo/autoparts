'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://anjarasoa:ranomainty@localhost:27017/autoparts_db', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Error DB connecting!')); 
db.once('open', function (){
    console.log("Connected to Autoparts MongoDB database!"); 
});

module.exports = mongoose;