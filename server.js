//Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');
//const db = require("./config/db");
var apiRouter = require('./apiRouter').router;

//Constants
const PORT = process.env.port || 8080;

//Instanciate Server
server = express(); 

//Middlewares configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(morgan('dev'));

//CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Configure Routes
server.get('/', (req, res, next) => {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Welcome to the AutoParts Manager API.</h1>');
});

server.use('/api/', apiRouter);

server.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error); 
});

server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
}); 

//Launch Server
server.listen(PORT, () => console.log(`Server work on port ${PORT}`));