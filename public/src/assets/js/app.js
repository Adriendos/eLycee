
// __ test nG CLem
var app;

app = angular.module('eLycee', ['ngRoute']);

app.controller('MainController', function() {
	var test = 'test';
});

app.controller('NewsController', function() {

});

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


// __init header sticky
function init() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100,
            header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            classie.add(header,"smaller");
        } else {
            if (classie.has(header,"smaller")) {
                classie.remove(header,"smaller");
            }
        }
    });
}
window.onload = init();
 
