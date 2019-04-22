// Grab the articles as a json
$(document).on("click", "button", function() {
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append('<div class="card mr-2 ml-2 mb-3"> <div class="card-body text-center">' + "<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  });

  // <!--START OF ARTICLE CARD-->
  //   <div class="card mr-2 ml-2 mb-3">
  //           <div class="card-body text-center">
  //             <h5 class="card-title text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, excepturi quisquam! Laudantium labore voluptatibus quisquam dolores? </h5>
  //             <a href="#" class="btn btn-primary save">Save Article</a>
  //           </div>
  //         </div>
  //   <!--END OF ARTICLE CARD-->