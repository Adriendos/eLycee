// __  Angular
var app;

app = angular.module('eLycee', [
  'ngRoute','ngResource','ngMap', 'ngAnimate', 'ngSanitize',
  'LocalStorageModule', 'toastr', 'textAngular', 'angularFileUpload', 'googlechart', 'djds4rce.angular-socialshare'
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
        answer: 'answers'
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


// __ Fonction notify accessible depuis n'importe quel $scope
app.run(['$rootScope','toastr', '$http', function($rootScope, toastr, DataAccess) {
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

// __ Config text-angular !!!
app.config(['$provide', function($provide){
    // this demonstrates how to register a new tool and add it to the default toolbar
    $provide.decorator('taOptions', ['$delegate', function(taOptions){
        // $delegate is the taOptions we are decorating
        // here we override the default toolbars and classes specified in taOptions.
        taOptions.toolbar = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
        ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft','justifyCenter','justifyRight'],
        ['html', 'insertImage', 'insertLink', 'unlink']
        ];
        taOptions.classes = {
            focussed: 'focussed',
            toolbar: '',
            toolbarGroup: 'ui icon buttons',
            toolbarButton: 'ui button',
            toolbarButtonActive: 'active',
            disabled: 'disabled',
            textEditor: '',
            htmlEditor: ''
        };
        return taOptions; // whatever you return will be the taOptions
    }]);
    // this demonstrates changing the classes of the icons for the tools for font-awesome v3.x
    $provide.decorator('taTools', ['$delegate', function(taTools){
        taTools.bold.iconclass = 'icon bold';
        taTools.italics.iconclass = 'icon italic';
        taTools.underline.iconclass = 'icon underline';
        taTools.ul.iconclass = 'icon list';
        taTools.ol.iconclass = 'icon list ordered';
        taTools.undo.iconclass = 'icon left arrow';
        taTools.redo.iconclass = 'icon right arrow';
        taTools.justifyLeft.iconclass = 'icon align left';
        taTools.justifyRight.iconclass = 'icon align right';
        taTools.justifyCenter.iconclass = 'icon align center';
        taTools.clear.iconclass = 'icon remove';
        taTools.insertLink.iconclass = 'icon linkify';
        taTools.insertImage.iconclass = 'icon attach';
        // there is no quote icon in old font-awesome so we change to text as follows
        delete 
        taTools.quote.iconclass;
        taTools.quote.buttontext = 'quote';
        return taTools;
    }]);
}]);

//Route Change interceptor
app.run(function ($rootScope, $location, SessionService, DataAccess) {
    $rootScope.$on("$locationChangeStart",function(){
        if( $location.path().indexOf('/admin') >= 0) {
            if(SessionService.isLoggedUser() && SessionService.isUserAdmin()) {
                //Logged user and admin
                return;
            } else {
                //No user logged or user not admin
                SessionService.checkToken()
                .then(function(data) {
                    if(data.role != 'teacher') {
                        $rootScope.notify("Vous n'avez pas accès à cette section.",'error')
                        $location.path('/');
                    }
                }, function(error) {
                        // promise rejected
                        $rootScope.notify("Vous n'avez pas accès à cette section.",'error')
                        SessionService.logout();
                        $location.path('/');
                    });
            }
        } else {
            // Not on an admin route, checks token to inialize user session
            SessionService.checkToken()
                .then(function() {
                    return;
                }, function() {
                    return;
                });
            /** 
            Faire test ici, pour rendre le twitter timeline
            **/
            if( $location.path().indexOf('/contact') < 0) {

            }
        }
    });
});





