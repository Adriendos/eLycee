var app;

app = angular.module('eLycee', [ 'MainController', 'ngRoute']);

app.controller('MainController', function() {
	this.test = "TEST ANGULAR";
});