// __  Angular

var app = angular.module('eLycee', ['ngRoute']);

app.controller('NavController', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

app.controller('HomeController', function($http, $location) {
    $http.get('/Ecole%20Multimédia/projet/eLycee/public/api/v1/questions').
      success(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
      }).
      error(function(data, status, headers, config) {
        console.log(config);
      });

});

app.controller('NewsController', function($scope) {

});

app.controller('ContactController', function($scope) {

});


// ROUTING ANGULAR
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'src/assets/partials/home.html'
    }).when('/news', {
        controller: 'NewsController',
        templateUrl: 'src/assets/partials/news.html'
    }).when('/contact', {
        controller: 'ContactController',
        templateUrl: 'src/assets/partials/contact.html'
    });
 }]);


// // __init header sticky
// function init() {
//     window.addEventListener('scroll', function(e){
//         var distanceY = window.pageYOffset || document.documentElement.scrollTop,
//             shrinkOn = 100,
//             header = document.querySelector("header");
//         if (distanceY > shrinkOn) {
//             classie.add(header,"smaller");
//         } else {
//             if (classie.has(header,"smaller")) {
//                 classie.remove(header,"smaller");
//             }
//         }
//     });
// }
// window.onload = init();
 
 
