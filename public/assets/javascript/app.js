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

$(".scrape-new").on("click", function () {
  $.get("api/scrape", function (data) {
    location.reload();
  });
});

$(".clear").on("click", function () {
  $.ajax({
    method: "DELETE",
    url: "/api/articles",
    success: function (data) {

    }
  });
  setTimeout(function () {
    location.reload();
  }, 60);
});

$(".del").on("click", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/api/saved/" + thisId,
    success: function (data) {
    }
  });
  setTimeout(function () {
    location.reload();
  }, 60);
})

$(".note").on("click", function () {
  // $('.modal').remove(); //remove modal here
  var thisId = $(this).attr("data-id");

  $.get("api/saved/" + thisId, function (data) {

    console.log(data)
    var notes = data.note;
    if (!notes.length) {
      modalNotes = "<li class='list-group-item'>No notes for this article yet.</li>";
    } else {
      modalNotes = "";

      for (let i = 0; i < notes.length; i++) {
        modalNotes += "<li class='list-group-item'>" + notes[i] + "<button data-id='" + thisId + "'class='btn btn-danger note-delete'>x</button></li>";
      };
    }
    var modal = "<div class='bootbox modal fade show' tabindex='-1' role='dialog'       style='padding-right: 16px; display: block;'>";
    modal += "<div class='modal-dialog'><div class='modal-content'><div class='modal-body'>";
    modal += "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true' style='margin-top: -10px;'>×</button>";
    modal += "<div class='bootbox-body'><div class='container-fluid text-center'>";
    modal += "<h4>Notes For Article: " + thisId + "</h4><hr>";
    modal += "<ul class='list-group note-container'>" + modalNotes + "</ul>";
    modal += "<textarea placeholder='New Note' rows='4' cols='60'></textarea><button id='saveBtn' data-id='" + thisId + "' class='btn btn-success'>Save Note</button></div></div></div></div></div></div>";
    $("body").append(modal);
  });
});


$(document).on("click", ".close", function () {
  $(".modal").remove();
})

$(document).on("click", "#saveBtn", function () {
  var thisId = $(this).attr("data-id");
  console.log("hi")
  $.ajax({
      method: "PUT",
      url: "/api/saved/" + thisId,
      data: {note: $("textarea").val()}
    })
    .then(function (data) {
      // Log the response
      console.log(data);
      $(".modal").remove();
    });
});

$(document).on("click", ".note-delete", function() {
  var thisId = $(this).attr("data-id");
  var note = $(this).parent().text()
  $.ajax({
    method: "PUT",
    url: "/api/saved/note/" + thisId,
    data: {note: note.substring(0, note.length - 1)}
  })
  .then(function (data) {
    // Log the response
    console.log(data);
    $(".modal").remove();
  });
})