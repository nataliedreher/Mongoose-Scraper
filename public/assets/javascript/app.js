// When you click the save button
$(".card").on("click", ".save", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/api/saved",
      data: {
        title: $(this).parent().find(".article-link").text(),
        link: $(this).parent().find(".article-link").attr("href"),
        summary: $(this).parent().parent().parent().find(".card-body").text()
      }
    })
    .then(function (data) {
      // Log the response
      console.log(data);
    });
});

$(".scrape-new").on("click", function() {
  $.get("api/scrape", function(data) {
    location.reload();
  });
});

$(".clear").on("click", function() {
  $.ajax({
    method: "DELETE",
    url: "/api/articles",
    success: function(data) {
    
  }});
 setTimeout(function(){
    location.reload();
  },60);
});