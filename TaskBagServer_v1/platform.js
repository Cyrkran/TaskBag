var express = require('express');
var TaskBag = require('./taskbag');

module.exports = function(app){
	
	var taskBag = new TaskBag();
	
	app.get('/takeTask', function(req, res){
		
		try{
			console.log("Entrou");
			
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			
			var task = taskBag.getTask();
			if(task == -1)
				throw "Não há tarefas pendentes";
				
			res.status(200).json({'Content': task});
			
		}catch(err){
			res.status(500).json({'error': err.message});
		}
	});
};
