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
app.use(routes);

// Main code
app.listen(SERVER_PORT, () =>
{
    console.log('App running');
})

