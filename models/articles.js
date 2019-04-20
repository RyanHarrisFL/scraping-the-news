var mongoose = require("mongoose");

// reference to mongoose schema constructor
var Schema = mongoose.Schema;

var DirtArticleSchema = new Schema({
    // `title` is required and of type String
    title: {
      type: String,
      required: true
    },
    // `link` is required and of type String
    link: {
      type: String,
      required: true
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
      }
    });


// Creates model - using mongoose metod
var Article = mongoose.model("Article", DirtArticleSchema);

// Export article to server.js
module.exports = Article;