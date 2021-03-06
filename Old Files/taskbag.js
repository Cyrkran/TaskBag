var Promise = require('bluebird');
var express = require('express');

var TaskBag = function(){
	
	this.n = [];
	const size = 10;
	var cout = 0;
	
	this.getTask = function(){
		
		if(this.n.length == 0)
			return;
			
		var task = Math.floor(Math.random() * 10) + 1;
		
		if(count < size){
			var elmnt = this.n.find(function(element){
				return element.id == task;
			});
			if(elmnt){
				++count;
				return elmnt;
			}
		}

	};
	
	this.dropTask = function(task){
		var index = this.n.findIndex(function(element){
			return element.id == task;
		});
		
		this.n.splice(index, 1);
		console.log(this.n);
	};
	
	this.generatePoints = function(){
		var self = this;
		for(let i = 0; i < 10; i++){
			self.n.push({"id": (i + 1), "pontos": [Math.random(),Math.random()]});
		}
		
	};
	
	this.generatePoints();
};

module.exports = TaskBag;
