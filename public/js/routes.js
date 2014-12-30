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
    }).when('/qcm', {
      controller : 'QcmController',
      templateUrl : 'js/views/qcm.html'
    })

    // __admin views
    .when('/admin', {
        controller : 'DashboardController',
        templateUrl : 'js/admin/views/dashboard.html'
    })
    .when('/admin/articles', {
        controller : 'PostController',
        templateUrl : 'js/admin/views/articles.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);