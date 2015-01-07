// __  Angular 
var app;

app = angular.module('eLycee', [ 
     'ngRoute','ngResource','ngMap', 'ngAnimate', 'ngSanitize', 
     'LocalStorageModule', 'toastr', 'angularFileUpload',
     'googlechart', 'djds4rce.angular-socialshare'
 ]);

app.constant('CONFIG', 
   { 
       mode: 'dev', 
       apiUrl : 'api/v1/', 
       urlAuth: 'api/v1/auth' 
   } 
);

app.constant('ENTITY', 
   { 
       post: 'posts', 
       qcm: 'qcms',
       question: 'questions', 
       answer: 'answers' ,
       score: 'scores',
       comment: 'comments',
       user:'users'
   } 
);

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
       titleClass: 'toast-title' 
   }); 
});


// __ Fonction notify accessible depuis n'importe quel $scope 
app.run(['$rootScope','toastr', function($rootScope, toastr) { 
   $rootScope.notify = function(message, level) { 
       switch(level) { 
           case 'error': 
               toastr.error(message,'Erreur'); 
               break;

           case 'success': 
               toastr.success(message); 
               break;

           case 'info': 
               toastr.info(message); 
               break;

           case 'warning': 
               toastr.warning(message, 'Attention'); 
               break;

           default: 
               toastr.info(message) 
               ; 
       } 
   }; 
}]);


//Route Change interceptor 
app.run(['$rootScope', '$location', 'SessionService', function ($rootScope, $location, SessionService) { 
   $rootScope.$on("$locationChangeStart", function () { 
       if ($location.path().indexOf('/admin') >= 0) { 
           if (SessionService.isLoggedUser() && SessionService.isUserAdmin()) { 
               //Logged user and admin 
               return; 
           } else { 
               //No user logged or user not admin 
               SessionService.checkToken() 
                   .then(function (data) { 
                       if (data.role != 'teacher') { 
                           $rootScope.notify("Vous n'avez pas accès à cette section.", 'error'); 
                           $location.path('/'); 
                       } 
                   }, function (error) { 
                       // promise rejected 
                       $rootScope.notify("Vous n'avez pas accès à cette section.", 'error'); 
                       SessionService.logout(); 
                       $location.path('/'); 
                   }); 
           } 
       } else { 
           // Not on an admin route, checks token to inialize user session 
           SessionService.checkToken() 
               .then(function () { 
                   return; 
               }, function () { 
                   return; 
               }); 
       } 
   }); 
}]);
