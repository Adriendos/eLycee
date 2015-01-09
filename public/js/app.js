// __  Angular 
var app;

app = angular.module('eLycee', [ 
     'ngRoute','ngResource','ngMap', 'ngAnimate', 'ngSanitize', 
     'LocalStorageModule', 'cgNotify', 'angularFileUpload',
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


// __ Fonction notify accessible depuis n'importe quel $scope 
app.run(['$rootScope', 'notify', function($rootScope, notify) {
    //notify.config({templateUrl: 'js/views/templates/notification.html'});

   $rootScope.notify = function(message, level) { 
       switch(level) { 
           case 'error':
               notify({message:message, classes:'notify error' });

               break;

           case 'success':
               notify({message:message, classes:'notify success' });
               break;

           case 'info':
               notify({message:message, classes:'notify info' });
               break;

           case 'warning':
               notify({message:message, classes:'notify warning' });
               break;

           default:
               notify({message:message, classes:'notify info' });
               ; 
       } 
   }; 
}]);


//Route Change interceptor 
app.run(['$rootScope', '$location', 'SessionService', function ($rootScope, $location, SessionService) {
   $rootScope.$on("$routeChangeStart", function (event, next, current) {
       if(($location.path().indexOf('/admin') >= 0) || ($location.path().indexOf('/qcm') >= 0) ) {
           SessionService.checkToken()
               .then(function (data) {
                   if (data.role != 'teacher' && ($location.path().indexOf('/admin') >= 0)) {
                       $rootScope.notify("Vous n'avez pas accès à cette section.", 'error');
                       $location.path('/');
                   } else {

                   }
               }, function (error) {
                   // promise rejected
                   $rootScope.notify("Vous n'avez pas accès à cette section.", 'error');
                   SessionService.logout();
                   $location.path('/');
               });
       } else {
           SessionService.checkToken()
               .then(function (data) {

               }, function (error) {
                  
               });
       }
   }); 
}]);
