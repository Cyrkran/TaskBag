var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var app = express();
app.use(bodyParser.json({limit: '50mb', extended: true})); //Allow sending a Javascript Object in a request
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); //Allows you to send you high load data


var TaskBag = require('./taskbag');
var taskBag = new TaskBag();
require('./platform')(app);

//add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
		
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
    
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
 
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      console.log(request);
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    
    console.log((new Date()) + ' Connection accepted');
    connection.on('message', function(message) {
		var data = JSON.parse(message.utf8Data);
        if (data.path === 'takeTask') {
            
            var obj = taskBag.getTask();
            //obj.request = 'takeTask';            
            
            connection.send(JSON.stringify(obj));
        }
        else if (data.path === 'error') {
            taskBag.dropTask(data.idTask);
            connection.send('{"id": null}');
        }
        else if(data.path === 'success'){
			let count = taskBag.getCount();
			if(count < taskBag.size){
				var pi = taskBag.GetPi();
			}
			connection.send('{"id": null}');
		}
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});


//console.log('App running on port 3000');
module.exports = app;
