// ROUTING ANGULAR
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'js/views/home.html'
    }).when('/news', {
      controller: 'NewsCtrl',
      templateUrl: 'js/views/news.html'
    }).when('/contact', {
      controller: 'ContactCtrl',
      templateUrl: 'js/views/contact.html'
    }).when('/post/:id', {
      controller : 'SinglePostCtrl',
      templateUrl : 'js/views/post/single.html'
    }).when('/qcm', {
      controller : 'QcmCtrl',
      templateUrl : 'js/views/qcm.html'
    }).when('/qcm/:id', {
      controller : 'ProceedQcmCtrl',
      templateUrl : 'js/views/qcm/single.html'
    })

    // __admin views
    .when('/admin', {
        controller : 'AdminDashboardCtrl',
        templateUrl : 'js/admin/views/dashboard.html'
    })
    .when('/admin/articles', {
        controller : 'AdminPostCtrl',
        templateUrl : 'js/admin/views/articles.html'
    })
    .when('/admin/qcm', {
      controller : 'AdminQcmCtrl',
      templateUrl : 'js/admin/views/qcms.html'
    })
    .when('/admin/qcm/create', {
      controller : 'AdminQcmCreationCtrl',
      templateUrl : 'js/admin/views/qcm/createQcm.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);