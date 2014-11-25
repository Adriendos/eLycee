var app;

app = angular.module('eLycee', ['ngRoute']);

app.controller('MainController', function() {
	var test = 'test';
});

app.controller('NewsController', function() {

});

// TROP CASSE COUILLE GRUNT !

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'MainController',
        templateUrl: 'src/assets/partials/test.html'
    }).when('/news', {
        controller: 'NewsController',
        templateUrl: 'src/assets/partials/news.html'
    });
 }]);
 