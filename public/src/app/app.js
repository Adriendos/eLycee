// __  Angular
var app;
app = angular.module('eLycee', ["ngRoute","ngResource","ngMap"]);

app.controller('NavController', ['$scope', '$location', function($scope, $location) {
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
}]);

app.factory('postsFactory', ['$http', function($http) {
  var urlBase = 'api/v1/posts';
  var postsFactory = {};

  postsFactory.getPosts = function () {
    return $http.get(urlBase);
  };

  return postsFactory;
}]);

app.controller('HomeController',['postsFactory', '$scope', function(postsFactory, $scope) {
    $scope.posts;

    getPosts();

    function getPosts() {
      postsFactory.getPosts()
          .success(function (posts) {
              $scope.posts = posts;
          })
          .error(function (error) {
              $scope.status = 'Unable to load post data: ' + error.message;
          });
    }
}]);


app.controller('NewsController', ['$http', '$location', '$scope', function($http, $location, $scope) {
  $http.get('api/v1/posts').
    success(function(data, status, headers, config) {
      $scope.allPosts = data;
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.info('error => '+ status);
      console.log(config);
    });
}]);

app.controller('ContactController', ['$scope', function($scope) {
  $scope.$on('mapInitialized', function(event, map) {
    console.log('ready');
    });
}]);



// ************* JEREMIE => connexion user 

app.controller('ConnexionController', ['$scope', function($scope) {
  // $scope.$on('mapInitialized', function(event, map) {
  //   console.log('ready');
  //   });
  $scope.update = function(user) {
    // $scope.master = angular.copy(user);
    console.log($scope.user);
  };
  
}]);




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

// AJAX REQUEST INTERCEPTOR (used to display ajax loading spinner ;) )
// //httpInterceptor creation with factory
// app.factory('ajaxSpinnerInterceptor', function ($q, $window) {
//   return function (promise) {
//     return promise.then(function (response) {
//       $("#spinner").hide();
//       console.log('stop');
//       return response;
//     }, function (response) {
//       $("#spinner").hide();
//       console.log('stop');
//       return $q.reject(response);
//     });
//   };
// });

// //registering it into httpProvider service
// app.config(["$httpProvider", function ($httpProvider) {
//   $httpProvider.interceptors.push('ajaxSpinnerInterceptor');

//   var spinnerFunction = function spinnerFunction(data, headersGetter) {
//     $("#spinner").show();
//     console.log('start');
//     return data;
//   };

//   $httpProvider.defaults.transformRequest.push(spinnerFunction);
// }]);


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


