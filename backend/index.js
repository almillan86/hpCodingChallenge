/***************************************************************
 * Coding Challenge for FullStack JavaScript position at HP
 * Author: Alberto Millán Almenar
 * Date: 05/05/2021
 * File: index.js
 **************************************************************/

// Configuration
const SERVER_PORT = 3000;

// Required frameworks
const express = require('express');
const app = express();
const routes = require('./routes.js');

// Routing
app.use(function (request, result, next) {

    // Website you wish to allow to connect
    result.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    result.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    result.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    result.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(routes);

// Main code
app.listen(SERVER_PORT, () =>
{
    console.log('App running');
})

