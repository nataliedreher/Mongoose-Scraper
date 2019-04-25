var db = require("../models");
var express = require("express");
var router = express.Router();


    function (req, res) {
        db.Post.findAll().then(function (posts) {
            res.json(posts);
        });
    }
    // Create a new post
    function (req, res) {
        db.Post.create(req.body).then(function (newPost) {
            res.json(newPost);
        });
    }
    // Delete the specified post
    function (req, res) {
        db.Post.destroy({ where: { id: req.params.id } }).then(function (deletedPost) {
            res.json(deletedPost);
        });
    }


    router.get("/", function (req, res) {
        burger.selectAll(function (data) {
            var hbsObject = {
                burger: data
            };
            console.log("hbsOb: ", hbsObject)
            res.render("index", hbsObject);
        });
    });

    router.get("/api/burgers", function (req, res) {
        burger.selectAll(function (data) {
            var hbsObject = {
                burger: data
            };
            return res.json(hbsObject);
        });

    });

    router.post("/api/burgers", function (req, res) {
        console.log(req.body.name)
        burger.insertOne([
            "burger_name", "devoured"
        ], [
            req.body.burger_name, false
        ], function (result) {
            // Send back the ID of the new quote
            res.json({
                id: result.insertId
            });
        });
    });

    router.put("/api/burgers/:id", function (req, res) {
        var condition = "id = " + req.params.id;

        console.log("condition", condition);

        burger.updateOne({
            devoured: req.body.devoured
        }, condition, function (result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });


    module.exports = router;

