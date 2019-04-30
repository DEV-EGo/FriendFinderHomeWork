var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

// created application/ urlencoder parser

app.use(bodyParser.urlencoded({ extended: true }));

//parse various different 
app.use(bodyParser.json({ type: "application/*+json" }))

//parse some custom into buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }))

// parse html into string
app.use(bodyParser.text({ type: "text/html" }))

require("./app/routing/api-routes")(app);
require("./app/routing/html-routes.js")(app);


app.listen(PORT, function () {
    console.log("app listening on PORT: " + PORT);
});