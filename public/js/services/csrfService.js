app.service('csrfTokenService', 
    ['$http', '$q', 'CONFIG',
    function($http, $q, CONFIG) {
        var csrfTokenService = {};

        csrfTokenService.get = function() {
            var deferred = $q.defer();
            $http.get(CONFIG.urlAuth + '/csrfToken').then(function(response){
                deferred.resolve(response.data);
            });
            return deferred.promise;
        };

        return csrfTokenService;
    }
]);
 