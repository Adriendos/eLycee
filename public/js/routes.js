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
    .when('/admin/qcm', {
      controller : 'AdminQcmsCtrl',
      templateUrl : 'js/admin/views/qcms.html'
    })
    .when('/admin/qcm/create', {
      controller : 'AdminQcmEditCtrl',
      templateUrl : 'js/admin/views/qcm/editQcm.html'
    })
    
    // __students
    .when('/admin/students', {
      controller : 'AdminStudentsCtrl',
      templateUrl : 'js/admin/views/students.html'
    })
    .when('/admin/student/create', {
      controller : 'AdminStudentEditCtrl',
      templateUrl : 'js/admin/views/student/editStudent.html'
    })
    .when('/admin/student/edit/:id', {
      controller : 'AdminStudentEditCtrl',
      templateUrl : 'js/admin/views/student/editStudent.html'
    })

    // __ Posts
    .when('/admin/posts', {
        controller : 'AdminPostsCtrl',
        templateUrl : 'js/admin/views/articles.html'
    })

    // @todo facto both create and edit are the same
    .when('/admin/post/create', {
      controller : 'AdminPostEditCtrl',
      templateUrl : 'js/admin/views/post/editPost.html'
    })
    .when('/admin/post/edit/:id', {
      controller : 'AdminPostEditCtrl',
      templateUrl : 'js/admin/views/post/editPost.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);