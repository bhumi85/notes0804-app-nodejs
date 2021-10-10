const express = require("express");
const bodyParser = require("body-parser");

// express app ------------------------->(framework for building REST API's)
const app = express();

//body-parser----->(module for parsing the requests of various content type that can be accessed in routes.) 

// parse requests of content-type - application/x-www-form-urlencoded---->middleware
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json----->middleware
app.use(bodyParser.json())
//middleware---> function with access to request and response objects

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
});
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/*const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open", function callback () {
	console.log("database connected successfully");
});*/

// Require Notes routes
require('./app/routes/note.routes.js')(app);

const port = app.listen(process.env.PORT || 3000);


// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});