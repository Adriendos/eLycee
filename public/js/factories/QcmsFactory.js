app.factory('QcmsFactory', ['$http', '$resource', '$q', 'CONFIG',
    function($http, $resource, $q, CONFIG) {
        var QcmsFactory = {},
            apiUrl = CONFIG.apiUrl;

        //var POSTS_CACHE = {};

        QcmsFactory.Qcm = $resource(
            apiUrl + 'qcms/:id',
            {id: '@id' },
            {
                query: {method: 'GET', isArray: true},
                get: {method: 'GET', params:{id:'@id'} },
                save: { method: 'POST' }
            }
        );

        QcmsFactory.getAllQcms = function () {
            var deferred = $q.defer();
            QcmsFactory.Qcm.query()
                .$promise.then(
                //success
                function(results) {
                    deferred.resolve(results[0]);
                },
                //error
                function(err) {
                    console.error(err);
                }
            );

            return deferred.promise;
        };

        QcmsFactory.getQcms = function(limitWantedQcms) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'qcms/limit/' + limitWantedQcms)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.$resolve(data);
                });

            return deferred.promise;
        };

        QcmsFactory.save = function(saveInfos) {
            console.info('js form', saveInfos);
            var newQcm = new QcmsFactory.Qcm(saveInfos);
            newQcm.$save();
        };

        return QcmsFactory;
    }]);
        
