var express = require('express');
var fs      = require('fs');
var app     = express();
var bodyParser = require('body-parser');

var ingredients = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", function(req, res){
  res.json(ingredients);
});

app.post("/api", function(req, res){
  ingredients.push(req.body);
  res.json(ingredients);
});

app.delete("/api/:term", function(req, res){
  ingredients = ingredients.filter(function(definition){
    return definition.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(ingredients);
});

app.use(express.static("public"));
app.listen(3000);
console.log("app is listening on port 3000");

module.exports = app;
