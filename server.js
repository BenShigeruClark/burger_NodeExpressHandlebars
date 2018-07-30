// require dependency packages

var express = require("express");

var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;
// Set up the express app
var app = express();
// Variable to require express-handlebars
var exphbs = require("express-handlebars");

// Serve static content for the app from public directory in applications directory
app.use(express.static("public"));
// Set up for express app data parsing
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application json
app.use(bodyParser.json());



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view-engine", "handlebars");

// Import routes and give the server acess
var routes = require("./controllers/burgers_controller.js");

app.use(routes);
// Start our server so that it can begin listening to client requests
app.listen(PORT, function() {
    // Log server side when our server has started    
    console.log("Server listening on http://localhost:" + PORT);
});


