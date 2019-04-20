
var express = require("express");
var mongoose = require("mongoose");

// These are required for 
//var axios = ("axios");
//var cherrios = ("cherrios");

// Requiring models from models folder
//var db = require("./models");

// creating port for routes
var PORT = 3000;

var app = express();

// Start of Middle Ware config 

//Uses logger to show requests
//app.use(logger("dev"));

//Parsing body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates static folder
app.use(express.static("public"));


//Creating connection to MongoDB database

mongoose.connect("mongodb://localhost/newsscraper", { useNewUrlParser: true});






// Starts up the server

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
