// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Express  body-parser middle-ware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// GET route with callback function to respond with the endpoint data.
function callBack (req, res) {
    res.send(projectData);
}

app.get('/all', callBack);

// POST route with newData function to add the new data to the projectData endpoint.
function newData (req, res) {
    console.log(req.body);
    let newEntry = {
        days: req.body.days,
        geoData: req.body.geoData,
        weathBData: req.body.weathBData,
        photo: req.body.photo
    };
    Object.assign(projectData, newEntry);
}

app.post('/addData', newData);

//export app for server start.js and callBack for jest
module.exports = app;
module.exports.callBack = callBack;