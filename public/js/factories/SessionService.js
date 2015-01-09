app.factory('SessionService',
    ['$http', '$rootScope', '$sanitize', '$location', '$resource', 'localStorageService', 'csrfTokenService', 'CONFIG','$q',
      function($http, $rootScope, $sanitize, $location, $resource, localStorageService, csrfTokenService, CONFIG, $q) {
        var userInfos,
            urlAuth = CONFIG.urlAuth,
            SessionService = {};

        SessionService.SESS_INIT = false;

        //SESSION GLOBAL
        var SESS = {};


        // LOGIN
        SessionService.login = function(userInfos) {
          csrfTokenService.get().then(function(csrfToken) {
            var request = { // __request users
              method : 'POST',
              url    : urlAuth + '/login',
              data   : {
                username : $sanitize( userInfos.username ),
                password : $sanitize( userInfos.password ),
                _token   : csrfToken
              }
            };

            return $http(request)
                .success( function(data ) {
                  localStorageService.set('credentials', data.token);
                  if(userInfos.rememberme != true) {
                    console.log('Destroy token cause userInfos.rememberme != true');
                    destroyToken();
                  }

                  $rootScope.notify('Bonjour '+data.user.username+' !', 'info');
                  SESS.user = data.user;
                  SESS.logged = true;
                  SessionService.SESS_INIT = true;

                  if(SESS.user.role.toLowerCase()=="teacher"){
                    $location.path('/admin');
                  }
                  return;

                })
                .error( function(data, status, headers, config) {
                  $rootScope.notify('Erreur d\' identifiants, veuillez réessayer.', 'error');
                });
          });
        };

        //LOGOUT
        SessionService.logout = function() {
          destroyToken().then(function() {
            SESS = {};
            SESS.logged = false;
            $location.path('/');
          });
        };

        // @ returns promise
        function destroyToken() {
          var token = localStorageService.get('credentials');
          var request = {
            method: "POST",
            url: urlAuth + '/logout',
            params: {
              auth_token: token,
              _method: 'DELETE'
            }
          };

          return $http(request)
              .then(function(response) {
                localStorageService.clearAll();
              }, function(response) {
                localStorageService.clearAll();
              });
        }

        // CHECKS TOKEN
        // @returns promise
        // Checks token server-side and initializes session or logout
        SessionService.checkToken = function() {
          var request = {
            method: "GET",
            url: CONFIG.urlAuth + '/checkSession',
            params: {auth_token: this.getToken()}
          };

          return $http(request)
              .then(function(response) {
                if (typeof response.data === 'object') {
                  SESS.logged = true;
                  SESS.user = response.data;
                  SessionService.SESS_INIT = true;
                  return response.data;
                } else {
                  // invalid response
                  SESS.logged = false;
                  SESS.user = {};
                  return $q.reject(response.data);
                }

              }, function(response) {
                // something went wrong
                return $q.reject(response.data);
              });
        };

        SessionService.getUser = function(){
          return SESS.user;
        };

        SessionService.isLoggedUser = function() {
          return SESS.logged;
        };

        SessionService.isUserAdmin = function() {
          return SESS.logged && SESS.user.role.toLowerCase() == "teacher";
        };

        SessionService.isUserStudent = function() {
          return SESS.logged && SESS.user.role.toLowerCase() != "teacher";
        };

        // __ private
        SessionService.getToken = function() {
          return localStorageService.get('credentials');
        };

        // Returns singleton
        return SessionService;
      }]);