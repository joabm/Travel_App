// Setup empty JS object to act as endpoint for all routes
projectData = {};

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

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening () {
    console.log(`running on localhost: ${port}`);
}

// GET route with callback function to respond with the endpoint data.
function callBack (req, res) {
    res.send(projectData);
}

app.get('/all', callBack);

// POST route with newData function to add the new data to the projectData endpoint.
function newData (req, res) {
    console.log(req.body);
    let newEntry = {
        city: req.body.city,
        country: req.body.country,
        lat: req.body.lat,
        lng: req.body.lng
    };
    Object.assign(projectData, newEntry);
}

app.post('/addData', newData);