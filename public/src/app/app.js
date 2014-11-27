// __  Angular
var app;
app = angular.module('eLycee', ["ngRoute","ngResource","ngMap"]);

// ROUTING ANGULAR
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeController',
      templateUrl: 'src/app/views/home.html'
    }).when('/news', {
      controller: 'NewsController',
      templateUrl: 'src/app/views/news.html'
    }).when('/contact', {
      controller: 'ContactController',
      templateUrl: 'src/app/views/contact.html'
    }).otherwise({
      redirectTo: '/'
    });
  }]);

// ************* JEREMIE => Authenticate user url laravel = api/v1/auth/login api/v1/auth/logout
app.factory('auth', function($http) {

  var userInfos,
  urlBase = 'api/v1/auth',
  auth    = {};

  auth.login = function(userInfos) {

    $http.post(urlBase+'/login', userInfos).
      success(function(data, status, headers, config) {
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  };

  return auth;
});

app.controller('ConnexionController', ['$scope', 'auth', function($scope, auth) {

  $scope.login = function() {
    auth.login($scope.user);
  };

}]);



