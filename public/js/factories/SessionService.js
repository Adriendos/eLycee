app.factory('SessionService',
    ['$http', '$rootScope', '$sanitize', '$location', '$resource', 'localStorageService', 'csrfTokenService', 'CONFIG','$q',
      function($http, $rootScope, $sanitize, $location, $resource, localStorageService, csrfTokenService, CONFIG, $q) {
        var userInfos,
            urlAuth = CONFIG.urlAuth,
            SessionService = {};

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
                  $rootScope.notify('Bonjour '+data.user.username+' !', 'info');
                  localStorageService.set('credentials', data.token);
                  SESS.user = data.user;
                  SESS.logged = true;
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
          var token = localStorageService.get('credentials');
          var request = {
            method: "POST",
            url: urlAuth + '/logout',
            params: {
              auth_token: token,
              _method: 'DELETE'
            }
          };
          $http(request).then(function(response) {
            SESS = {};
            SESS.logged = false;
            localStorageService.clearAll();
            SESS = {};
            $location.path('/');
          });
        };

        // CHECKS TOKEN
        // @return promise
        // Checks token server-side and initializes session or logout
        SessionService.checkToken = function() {
          var request = {
            method: "GET",
            url: CONFIG.urlAuth + '/checkSession',
            params: {auth_token: getToken()}
          };

          return $http(request)
              .then(function(response) {
                if (typeof response.data === 'object') {
                  SESS.logged = true;
                  SESS.user = response.data;
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
        }

        SessionService.isUserAdmin = function() {
          return SESS.logged && SESS.user.role.toLowerCase() == "teacher";
        }

        // __ private
        function getToken() {
          return localStorageService.get('credentials');
        }

        // Returns singleton
        return SessionService;
      }]);