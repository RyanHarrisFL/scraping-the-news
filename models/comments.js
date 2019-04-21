var mongoose = require("mongoose");

//Reference to schema constructor
var Schema = mongoose.Schema;

// Creating a Comments object 
var CommentSchema = new Schema ({
    title: String,
    body: String
});


var Comments = mongoose.model("Comments", CommentSchema);

//Exporting the Comments model
module.exports = Comments;