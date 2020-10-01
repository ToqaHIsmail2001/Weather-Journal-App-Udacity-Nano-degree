// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/

/* Dependencies */
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Spin up the server
const server = app.listen(port, function listening(){
    console.log("server is running");
    console.log(`running on localhost: ${port}`);
});

// Setup empty JS object to act as endpoint for all routes
 projectData = {};

// Setup Server

//GET route that returns the projectData object
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route 
app.post('/addData', (req, res) => {
    // console.log(req.body);
    let newEntry =
    {
        temperature: req.body.temperature,
        date: req.body.date,
        feeling: req.body.userResponse,
    };
    projectData = newEntry;
    res.status(200).end();
    console.log(projectData);
});


