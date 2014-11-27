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
// app.factory('auth', function($http, $q, $window) {
//   var userInfos;
 
//   function login(userName, password) {
//     var deferred = $q.defer();
 
//     $http.post('/api/login', {
//       userName: userName,
//       password: password
//     }).then(function(result) {
//       userInfo = {
//         accessToken: result.data.access_token,
//         userName: result.data.userName
//       };
//       $window.sessionStorage['userInfos'] = JSON.stringify(userInfo);
//       deferred.resolve(userInfo);
//     }, function(error) {
//       deferred.reject(error);
//     });
 
//     return deferred.promise;
//   }
 
//   return {
//     login: login
//   };
// });

app.factory('dataFactory', ['$http', function($http) {

    var urlBase = '/api/customers';
    var dataFactory = {};

    dataFactory.getCustomers = function () {
        return $http.get(urlBase);
    };

    dataFactory.getCustomer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertCustomer = function (cust) {
        return $http.post(urlBase, cust);
    };

    dataFactory.updateCustomer = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    dataFactory.deleteCustomer = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    dataFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };

    return dataFactory;
}]);

app.controller('ConnexionController', ['$scope', 'auth', 'userFactory', function($scope, auth) {

  $scope.userConnection = function() {
    console.log($scope.user);
  };

}]);
