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
    }).when('/admin', {
        controller : 'AdminController',
        templateUrl : 'src/app/admin/views/admin.html'
    }).otherwise({
      redirectTo: '/'
    });
  }]);

// ************* JEREMIE => Authenticate user url laravel = api/v1/auth/login api/v1/auth/logout
app.factory('auth', function($http) {

  var userInfos,
  urlBase = 'api/v1/auth',
  auth    = {};
  
  auth.login = function(userMail, password) {

    $http.post(urlBase+'/login', {msg:'hello word!'}).
            success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
            }).
            error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
  };

  return auth;
 
  // function login(userName, password) {
  //   var deferred = $q.defer();
 
  //   $http.post('/api/login', {
  //     userName: userName,
  //     password: password
  //   }).then(function(result) {
  //     userInfo = {
  //       accessToken: result.data.access_token,
  //       userName: result.data.userName
  //     };
  //     $window.sessionStorage['userInfos'] = JSON.stringify(userInfo);
  //     deferred.resolve(userInfo);
  //   }, function(error) {
  //     deferred.reject(error);
  //   });
 
  //   return deferred.promise;
  // }
 
  // return {
  //   login: login
  // };
});

app.controller('ConnexionController', ['$scope', 'auth', function($scope, auth) {

  $scope.userConnection = function() {
    var users = auth.getUsers();
    users.
      success(function(data, status, headers, config) {
        // $scope.allPosts = data;
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        console.info('error => '+ status);
        console.log(config);
      });
  };

}]);



