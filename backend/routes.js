/***************************************************************
 * Coding Challenge for FullStack JavaScript position at HP
 * Author: Alberto Millán Almenar
 * Date: 05/05/2021
 * File: routes.js
 **************************************************************/
// Required frameworks 
const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

// Constants
const BASE_URL = 'https://itunes.apple.com/search?'

// Variables to define from Vue.js
var term = ''; //< To be completed with info coming from FrontEnd
var media = 'music';
var entity = 'album';
var attribute = 'artistTerm';
var limitValue = 200;

// Helpers
function dumpAlbumNames(array)
{
    for (const value of array)
    {
        console.log(value.collectionName);
    }
}

function filterDuplicates(array)
{
    var hash = {};
    array = array.filter(function(current) {
      var exists = !hash[current.collectionName];
      hash[current.collectionName] = true;
      return exists;
    });
    
    return array;
}

function transformInput(string)
{
    return string.replace(/\s+/g, '+');
}

// Middle wares
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Routing
router.post('/request', async(request, response) => {

    console.log("Request is " + request.body.artistName);
    console.log("After transformation is " + transformInput(request.body.artistName))
  
    const iTunesRequest = BASE_URL 
    + 'term=' + transformInput(request.body.artistName)
    + '&media=' + media
    + '&entity=' + entity
    + '&attribute=' + attribute
    //+ '&limit=' + limitValue;

    try {

        console.log('Requested query ' + iTunesRequest);

        const result = await axios.get(iTunesRequest);

        result.data.results = filterDuplicates(result.data.results);
        result.data.resultCount = result.data.results.length;
        
        //return response.json(JSON.stringify(dataFiltered));
        return response.json(result.data);

    } catch(err) {
        console.log("ERROR! Failing request to iTunes API");
    }   
})

// End routing
module.exports = router;