// __  Angular
var app;
app = angular.module('eLycee', ["ngRoute","ngResource"]);

app.controller('NavController', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

app.controller('HomeController', function($http, $location, $scope) {
    $http.get('api/v1/posts').
      success(function(data, status, headers, config) {
        $scope.allPosts = data;
      }).
      error(function(data, status, headers, config) {
        console.info('error...');
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

// AJAX REQUEST INTERCEPTOR (used to display ajax loading spinner ;) )
//httpInterceptor creation with factory
app.factory('ajaxSpinnerInterceptor', function ($q, $window) {
  return function (promise) {
    return promise.then(function (response) {
      $("#spinner").hide();
      console.log('stop');
      return response;
    }, function (response) {
      $("#spinner").hide();
      console.log('stop');
      return $q.reject(response);
    });
  };
});

//registering it into httpProvider service
app.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.responseInterceptors.push('ajaxSpinnerInterceptor');

  var spinnerFunction = function spinnerFunction(data, headersGetter) {
    $("#spinner").show();
    console.log('start');
    return data;
  };

  $httpProvider.defaults.transformRequest.push(spinnerFunction);
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
 
 
