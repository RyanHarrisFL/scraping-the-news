
var express = require("express");
var mongoose = require("mongoose");

// These are required for 
var axios = ("axios");
var cherrios = ("cherrios");

// Requiring models from models folder
var db = require("./models");

// creating port for routes
var PORT = 3000;

var app = express();

// Start of Middle Ware config 

//Uses logger to show requests
app.use(logger("dev"));

//Parsing body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates static folder
app.use(express.static("public"));


//Creating connection to MongoDB database

mongoose.connect("mongodb://localhost/newsScraperPopulator", { useNewUrlParser: true});

app.get("scrape/", function(res, res) {
//Uses axios to grab the body of the html 
    axios.get("https://www.tmz.com/").then(function(response) {
        // Cheerio takes body of html from site and saves it to $ for shorthand selector
        var $ = cheerio.load(response.data);

        //creating an empty object to display results

        $("article h5").each(function (i, element){
            var result = {};

            result.title = $(this)
                .children("data-text")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

        //Creating new Article from result array that was scraped. 
        db.Article.create(result)
            .then(function(dbDirtArticle) {
                console.log(dbDirtArticle)
            })
            .catch(function (err) {
                console.log(err);
            });
        });
        
        res.setEncoding("Finished Scraping")
    });
});







// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
