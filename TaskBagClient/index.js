var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json({limit: '50mb', extended: true})); //Allow sending a Javascript Object in a request
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); //Allows you to send you high load data

app.listen(3000);
console.log("App running on port 3000");
app.use(express.static(__dirname));

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

module.exports = app;
