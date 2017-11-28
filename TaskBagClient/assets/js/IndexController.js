app = angular.module('TaskBagApp', []);

app.controller('TaskBagController', TaskBagController);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

function TaskBagController($scope) {
	
	this.notificationWs = undefined;
	this.responses = [];
	
	this.showAlert = function(alerta){
		alert(alerta);
	};
	
	this.onMessage = function(msg){
		var self = this;
		
		let data = JSON.parse(msg.data);
		console.log(data);
		
		if(data.id != null)
			self.getDistanceToCenter(data);
		
		if(!$scope.$$phase) $scope.$apply();
	}.bind(this);
	
	this.getDistanceToCenter = function(task){
		var self = this;
		
		var pontos = task.pontos;
		var origem = [0,0];
		//d = raiz ( (Xa-Xb)² + (Ya-Yb)² )

		var d = Math.sqrt( Math.pow(origem[0] - pontos[0]) + Math.pow(origem[1] - pontos[1]));
		
		if(d <= 1)
			this.notificationWs.send(JSON.stringify({'path': 'success', 'idTask': task.id}));
		else
			this.notificationWs.send(JSON.stringify({'path': 'error', 'idTask': task.id}));
	};
	
	this.init = function(){
		var self = this;
		self.notificationWs = new WebSocket('ws://10.2.5.5:8080/', ['echo-protocol']);
		self.notificationWs.onmessage = self.onMessage;
		//self.notificationWs.onopen = function(opn){  }.bind(self);
		
		self.interval();
	};
	
	this.interval = function(){
		setInterval(function(){ this.notificationWs.send(JSON.stringify({'path':"takeTask"})); }.bind(this), 3000);
	};
};
