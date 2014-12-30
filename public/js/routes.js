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
    }).when('/qcm/:id', {
      controller : 'ProceedQcmController',
      templateUrl : 'js/views/qcm/single.html'
    })

    // __admin views
    .when('/admin', {
        controller : 'AdminDashboardController',
        templateUrl : 'js/admin/views/dashboard.html'
    })
    .when('/admin/articles', {
        controller : 'AdminPostController',
        templateUrl : 'js/admin/views/articles.html'
    })
    .when('/admin/qcm', {
      controller : 'AdminQcmController',
      templateUrl : 'js/admin/views/qcms.html'
    })
    .when('/admin/qcm/create', {
      controller : 'AdminQcmCreationController',
      templateUrl : 'js/admin/views/qcm/createQcm.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);