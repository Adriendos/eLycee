// __  Angular

var app = angular.module('adminELycee', ['ngRoute','ngRessource']);

app.controller('Nav2Controller', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});


app.controller('AdminController', function($scope) {
  $http.get('api/v1/posts').
  success(function(data, status, headers, config) {
    $scope.allPosts = data;
    console.log(data);
  }).
  error(function(data, status, headers, config) {
    console.info('error => '+ status);
    console.log(config);
  });
});

app.controller('PostController', function($scope) {
  $http.get('api/v1/posts').
  success(function(data, status, headers, config) {
    $scope.allPosts = data;
    console.log(data);
  }).
  error(function(data, status, headers, config) {
    console.info('error => '+ status);
    console.log(config);
  });
});

app.controller('QuestionController', function($scope) {
  $http.get('api/v1/questions').
  success(function(data, status, headers, config) {
    $scope.allPosts = data;
    console.log(data);
  }).
  error(function(data, status, headers, config) {
    console.info('error => '+ status);
    console.log(config);
  });
});

app.controller('EleveController', function($scope) {
  $http.get('api/v1/eleves').
  success(function(data, status, headers, config) {
    $scope.allPosts = data;
    console.log(data);
  }).
  error(function(data, status, headers, config) {
    console.info('error => '+ status);
    console.log(config);
  });
});

app.controller('ContactController', function($scope) {
  $http.get('api/v1/contacts').
  success(function(data, status, headers, config) {
    $scope.allPosts = data;
    console.log(data);
  }).
  error(function(data, status, headers, config) {
    console.info('error => '+ status);
    console.log(config);
  });
});


 // ROUTING ANGULAR
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'AdminController',
        templateUrl: 'src/admin/views/dashboard.html'
    }).when('/articles', {
        controller: 'PostController',
        templateUrl: 'src/admin/views/articles.html'
    }).when('/questions', {
        controller: 'QuestionController',
        templateUrl: 'src/assets/partials/questions.html'
    }).when('/eleves', {
        controller: 'EleveController',
        templateUrl: 'src/assets/partials/eleves.html'
    }).when('/contacts', {
        controller: 'ContactController',
        templateUrl: 'src/assets/partials/contacts.html'
    }).otherwise({
      redirectTo: '/'
    });
}]);

