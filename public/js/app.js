// __  Angular 
var app;

app = angular.module('eLycee', [ 
     'ngRoute','ngResource','ngMap', 'ngAnimate', 'ngSanitize',
     'LocalStorageModule', 'cgNotify', 'angularFileUpload', 
     'googlechart', 'djds4rce.angular-socialshare', 'ngProgress','angularMoment'
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

app.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
    timezone: 'Europe/Paris' // optional
});

// __ Config du localStorage 
app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('eLycee') 
    .setNotify(true, true);

}]);

// __ Fonction notify accessible depuis n'importe quel $scope 
app.run(['$rootScope', 'notify', function($rootScope, notify) {

    notify.config({
        duration: 2000,
        //position: 'right' => doesn't work

    });

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

app.run(function(amMoment) {
    amMoment.changeLocale('fr');
});








