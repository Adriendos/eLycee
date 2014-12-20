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
    }).when('/post/:id', {
        controller : 'NewsController',
        templateUrl : 'js/views/post/single.html'
    })

    // __admin views
    .when('/admin', {
        controller : 'AdminController',
        templateUrl : 'js/admin/views/dashboard.html'
    })
    .when('/admin/articles', {
        controller : 'AdminArticlesController',
        templateUrl : 'js/admin/views/articles.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);

// __ Config du localStorage
app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('eLycee')
    .setNotify(true, true); 
}]);

// __ Config Toastr 
app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: true,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    positionClass: 'toast-top-right',
    tapToDismiss: true,
    timeOut: 1000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
});

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




