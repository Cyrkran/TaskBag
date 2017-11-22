var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var app = express();
app.use(bodyParser.json({limit: '50mb', extended: true})); //Allow sending a Javascript Object in a request
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); //Allows you to send you high load data

app.listen(3000); //Listens to port 3000 and awaits for requests

var taskBag = require('./taskbag');

//add headers
app.use(function (req, res, next) {
	console.log(req);
	console.log(res);
	console.log(next);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

module.exports = app;
