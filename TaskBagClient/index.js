var express = require('express');
var app = express();



var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
   console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
   console.log('WebSocket Client Connected');
   connection.on('error', function(error) {

   });
   connection.on('close', function() {
       console.log("Conexão Finalizada. Concluído com sucesso");
   });
   connection.on('message', function(message) {
      let data = JSON.parse(message.utf8Data);
      
      if(data.id != null){
        
        console.log(data);        
        console.log("Received Object id: '" + data.id + "'");
        getDistanceToCenter(data);

      }
   });
   
   function sendNumber() {
       if (connection.connected) {
           connection.send(JSON.stringify({'path':"takeTask"}));
           setTimeout(sendNumber, 1000);
       }
   }

    function getDistanceToCenter(task){

      var pontos = task.pontos;
      var origem = [0,0];
      //d = raiz ( (Xa-Xb)² + (Ya-Yb)² )

      var d = Math.sqrt( ((origem[0] - pontos[0]) * (origem[0] - pontos[0])) +((origem[1] - pontos[1]) * (origem[1] - pontos[1])));

      if(d <= 1){
       connection.send(JSON.stringify({'path': 'success', 'idTask': task.id}));
      }
      else{
       connection.send(JSON.stringify({'path': 'error', 'idTask': task.id}));
      }
    };
   sendNumber();
});


client.connect('ws://192.168.5.1:8080/', 'echo-protocol');

