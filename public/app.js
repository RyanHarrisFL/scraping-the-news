$(document).ready(function() {

  handleArticleScrape();

// Grab the articles as a json
$(document).on("click", "#scrape-news", function() {
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append('<div class="card mr-2 ml-2 mb-3"> <div class="card-body text-center">' + "<h5 " + 'class="card-title text-center "' + "data-id='" + data[i]._id + "'>" + "<a href ='" + data[i].link + "'  target='_blank'>" + data[i].title + '</h5>' + '<a href="#" class="btn btn-primary save">Save Article</a>' );
    }
  });
  hideCard();
  });


// Deletes All Articles currently on the page
$(document).on("click", "#clear", function() {
  $.getJSON("/clearall", function(data) {
      // For each one
        // Display the apropos information on the page
        $("#articles").empty();
     
    });
    handleArticleScrape();
    });

    function handleArticleScrape() {
    $.get("/scrape").then(function(data) {
      console.log(data)
    });
  }


// Function for hiding No Article Card on Page
function hideCard() {
  $("#no-article-card").hide();
};

});
