var app;

app = angular.module('eLycee', ['ngRoute']);

app.controller('MainController', function() {
	this.test = "TEST ANGULAR";
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'MainController',
        templateUrl: 'src/assets/partials/test.html'
    });
 }]);