var express = require("express");

var router = express.Router();
// Import the model (burger.js)  to use its databse functions
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required
router.get("/", function(req, res) {
    res.redirect("/burgers");
});


router.get("/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    burger.all(function(burgerData) {
     
       // wrapper for orm.js using mysql query callback will return burger_data, render to index with handlebars
        res.render("index", { burger_data: burgerData });
    });
});
    // post route back to index
router.post("/burgers/create", function(req, res) {
    // takes the request object using input for burger.addBurger
    burger.create(req.body.burger_name, function(result) {
        // wrapper for orm.js using mysql insert callback that will return a log to console
        // render back to index with handlebars
        console.log(result);
        res.redirect("/");
    });
});
        // put route back to index
router.put("/burgers/:id", function(req, res) {
    burger.update(req.params.id, function(result) {
        // wrapper for orm.js that is using mysql update callback will return a log to console
        // render back to index with handlebars
        console.log(result);
        // send back response and let page reload from .then in Ajax
        res.sendStatus(200);
    });
});

module.exports = router;

