var router = require("express").Router();
var db = require("../../models");

// This route renders the homepage
router.get("/", function (req, res) {
    // console.log("hi")

    db.Article.find({})
        .then(function (dbArticle) {
            // console.log(dbArticle)
            // If we were able to successfully find Articles, send them back to the client
            var data = {
                article: []
            };
            for (let i = 0; i < dbArticle.length; i++) {
                data.article.push(dbArticle[i])

            }
            res.render("index", data)
            // res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            // res.json(err);
        });

    // res.render("index")
});

router.get("/saved", function (req, res) {
    // console.log("hi")

    db.Saved.find({})
        .then(function (dbArticle) {
            console.log(dbArticle)
            // If we were able to successfully find Articles, send them back to the client
            var data = {
                article: []
            };
            for (let i = 0; i < dbArticle.length; i++) {
                data.article.push(dbArticle[i])

            }
            res.render("index", data)
            // res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            // res.json(err);
        });

    // res.render("index")
});

router.get("/saved", function (req, res) {
    res.render("saved")
});

module.exports = router;