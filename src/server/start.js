// import app from server.js
const app = require ('./server.js');

// Setup Server
const port = 8080;
const server = app.listen(port, listening);

function listening () {
    console.log(`running on localhost: ${port}`);
}