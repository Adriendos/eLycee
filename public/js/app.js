// __  Angular
var app;
app = angular.module('eLycee', ["ngRoute","ngResource","ngMap","angular-growl","ngAnimate", "ngSanitize"]);

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
        templateUrl : 'js/admin/views/admin.html'
    }).when('/post/:id', {
        controller : 'NewsController',
        templateUrl : 'js/views/post/single.html'
    }).otherwise({
      redirectTo: '/'
    });
  }]);

// __ Config des notifications
app.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive({
    success: 1000, 
    error: 1000, 
    warning: 3000, 
    info: 4000
  });
}]);

// __ Config du localStorage
app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('eLycee');
}]);

// __ Fonction notify accessible depuis n'importe quel $scope
app.run(['$rootScope','growl', '$http', function($rootScope, growl, $http) {
  $rootScope.notify = function(message, level) {
    switch(level) {
      case 'error':
        growl.error(message, {title: message});
      break;

      case 'success':
        growl.success(message, {title: message});
      break;

      case 'info':
        growl.info(message, {title: message});
      break;

      case 'warning':
        growl.warning(message, {title: message});
      break;

      default:
        growl.info(message, {title: message});
      ;
    }
  };
}]);




