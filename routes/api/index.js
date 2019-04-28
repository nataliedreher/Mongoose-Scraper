var router = require("express").Router();
var db = require("../../models");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.clickhole.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function (i, element) {
            // Save an empty result object
            var result = {};
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .find("h1")
                .find("a")
                .text();
            result.link = $(this)
                .find("h1")
                .find("a")
                .attr("href");
            result.summary = $(this)
                .find("p")
                .text()
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
         });
        // Send a message to the client
        res.send("Scrape Complete");
    });
});

router.post("/saved", function (req, res) {
    // If we were able to successfully find Articles, send them back to the client
    var data = req.body;
    console.log(data)
    // var bleh = {title: "bleh", link: "bleh.com", summary: "all the bleh"}
    db.Saved.create(data)
        .then(function (dbSaved) {
            // res.json(dbSaved);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
})

router.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });

})

router.delete("/articles", function(req, res) {
    db.Article.deleteMany({}, function (err) {
        if (err) return handleError(err);
      });
      db.Saved.deleteMany({}, function (err) {
        if (err) return handleError(err);
      });
})


module.exports = router;