var Promise = require('bluebird');
var express = require('express');

var TaskBag = function(){
	
	this.n = [];
	this.succeed = [];
	this.size = 100;
	var count = 0;
	
	this.getTask = function(){
		
		if(this.n.length == 0)
			return;
			
		
		if(count < this.size){
			var elmnt = undefined;
			while(!elmnt){
				var task = Math.floor(Math.random() * this.size) + 1;
				elmnt = this.n.find(function(element){
					return element.id == task;
				});
				if(elmnt){
					++count;
					return elmnt;
				}
			}
		}
	};
	this.success = function(idTask){
		this.succeed.push(this.n.find(function(el){
			return idTask == el.id
		}));
		this.dropTask(idTask);
		
	};
	this.dropTask = function(task){
		var index = this.n.findIndex(function(element){
			return element.id == task;
		});
		
		this.n.splice(index, 1);
		//console.log(this.n);
	};
	
	this.getCount = function(){ 
		return count;
	};
	
	this.generatePoints = function(){
		var self = this;
		for(let i = 0; i < this.size; i++){
			self.n.push({"id": (i + 1), "pontos": [Math.random(),Math.random()]});
		}
		
	};
	
	this.GetPi = function(){
		console.log(this.succeed);
		return ((this.succeed.length * 4) / this.size);
	};
	
	this.generatePoints();
};

module.exports = TaskBag;
