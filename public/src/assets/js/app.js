var app;

app = angular.module('eLycee', ['ngRoute']);

app.controller('MainController', function() {
	this.test = "TEST ANGULAR";
});

// TROP CASSE COUILLE GRUNT !

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'PhoneListCtrl'
      }).
      when('/news', {
        templateUrl: 'partials/news.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
