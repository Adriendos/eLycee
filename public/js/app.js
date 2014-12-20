// __  Angular
var app;

app = angular.module('eLycee', [
  "ngRoute","ngResource","ngMap",
  "ngAnimate","ngSanitize","LocalStorageModule", "toastr"
]);

// ROUTING ANGULAR
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeController',
      templateUrl: 'js/views/home.html'
    }).when('/news', {
      controller: 'NewsController',
      templateUrl: 'js/views/news.html'
    }).when('/contact', {
      controller: 'ContactController',
      templateUrl: 'js/views/contact.html'
    }).when('/admin', {
        controller : 'AdminController',
        templateUrl : 'js/admin/views/dashboard.html'
    }).when('/post/:id', {
        controller : 'NewsController',
        templateUrl : 'js/views/post/single.html'
    }).otherwise({
      redirectTo: '/'
    });
  }]);

// __ Config du localStorage
app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('eLycee')
    .setNotify(true, true); 
}]);

// __ Fonction notify accessible depuis n'importe quel $scope
app.run(['$rootScope','toastr', '$http', function($rootScope, toastr, $http) {
  $rootScope.notify = function(message, level) {
    switch(level) {
      case 'error':
        toastr.error(message,'Erreur');
      break;

      case 'success':
        toastr.success(message);
      break;

      case 'info':
        toastr.success(message);
      break;

      case 'warning':
        toastr.success(message, 'Attention');
      break;

      default:
        toastr.info(message)
      ;
    }
  };
}]);




