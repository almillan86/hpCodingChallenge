/***************************************************************
 * Coding Challenge for FullStack JavaScript position at HP
 * Author: Alberto Millán Almenar
 * Date: 05/05/2021
 **************************************************************/

// Configuration
const SERVER_PORT = 3000;
const BASE_URL = 'https://itunes.apple.com/search?'

// Variables to define from Vue.js
var term = 'michael+jackson';
var media = 'music';
var entity = 'album';
var attribute = 'artistTerm';
var limitValue = 200;

// Required frameworks
const express = require('express');
const axios = require('axios');
const app = express();

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
    
    console.log(JSON.stringify(array));    

    return array;
}

// Main code
app.listen(SERVER_PORT, () =>
{
    console.log('App running');
})

app.get('/', async(request, response) => {

    const iTunesRequest = BASE_URL 
                        + 'term=' + term
                        + '&media=' + media
                        + '&entity=' + entity
                        + '&attribute=' + attribute
                        + '&limit=' + limitValue;

    try {

        console.log('Requested query ' + iTunesRequest);

        const result = await axios.get(iTunesRequest);
        const dataFiltered = filterDuplicates(result.data.results);

        console.log("Album titles without duplicated:")
        dumpAlbumNames(dataFiltered);

        //return response.json(result.data);
        return response.json(JSON.stringify(dataFiltered));

    } catch(err) {
        console.log("ERROR! Failing request to iTunes API");
    }
    
})

