
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


// These are required for 
var axios = require("axios");
var cheerio = require("cheerio");

// Requiring models from models folder
var db = require("./models");

// creating port for routes
var PORT = process.env.PORT || 3000;

var app = express();

// Start of Middle Ware config 

//Uses logger to show requests
app.use(logger("dev"));

//Parsing body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// get route -> index
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/saved", function(req, res) {
  res.render("saved");
});



//Creating connection to MongoDB database

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraperPopulator";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

app.get("/scrape", function(res, res) {
//Uses axios to grab the body of the html 
    axios.get("https://www.tmz.com/").then(function(response) {
        // Cheerio takes body of html from site and saves it to $ for shorthand selector
        var $ = cheerio.load(response.data);

        //creating an empty object to display results

        $("article h4").each(function (i, element){
            var result = {};

            result.title = $(this)
                .children("a")
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
                console.log(dbDirtArticle);
            });
        });
        // Message goes to the client side.
        res.send("Scrape Complete");
    });
});

// Gets all articles from the database
app.get("/articles", function(req, res) {
    //All articles
    db.Article.find({})
      .then(function(dbDirtArticle) {
        //Sends articles back to client as json object.
        res.json(dbDirtArticle);
      })
      .catch(function(err) {
        // lets client know if there is an error trying to return article request.
        res.json(err);
      });
  });


// Grabs a specific article and populates comments related to it. 
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("Comments")
      .then(function(dbDirtArticle) {
        res.json(dbDirtArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });


  // Delete all articles from the database
app.get("/clearall", function(req, res) {
  // Remove every note from the notes collection
  db.Article.remove({}, function(error, response) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(response);
      res.send(response);
    }
  });
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
  

  
