app.factory('ResourceFactory', ['$resource', 'CONFIG', 'ENTITY', 'SessionService',
    function($resource, CONFIG, ENTITY, SessionService) {

        var ResourceService = {};

        var apiUrl = CONFIG.apiUrl;

        var RESOURCES = {};

        //Token Handler : api protection

        //Generic resource generator
        ResourceService.getResource = function(entityName) {
            if(RESOURCES[entityName]) {
                return RESOURCES[entityName];
            } else {
                var resource;

                switch(entityName) {
                    case ENTITY.question :
                        resource =  $resource(
                            apiUrl + "qcms/:id/questions",
                            {
                                id: '@id'
                            },
                            {
                                query: {method: 'GET', isArray: true, cache: true}
                            }
                        );
                        break;
                    case ENTITY.answer :
                        resource =  $resource(
                            apiUrl + "questions/:id/answers",
                            {
                                id: '@id'
                            },
                            {
                                query: {method: 'GET', isArray: true, cache: true}
                            }

                        );
                        break;
                    case ENTITY.comment :
                        resource =  $resource(
                            apiUrl + "posts/:id/comments",
                            {
                                id: '@id'
                            },
                            {
                                query: {method: 'GET', isArray: true, cache: true},
                                save: { url: apiUrl+ENTITY.comment , method:'POST'}
                            }

                        );
                        break;
                    default :
                        resource = $resource(
                            apiUrl + entityName + '/:id',
                            {
                                id: '@id'
                            },
                            {
                                query: {method: 'GET', isArray: true, cache: true},
                                get: {method: 'GET', params: {id: '@id' }, isArray: false, cache : true},
                                save: {method: 'POST', headers: { 'X-Auth-Token' : SessionService.getToken() } },
                                update: { method:'PUT', headers: { 'X-Auth-Token' : SessionService.getToken() } }
                            }

                        );
                        break;
                }

                RESOURCES[entityName] = resource;

                return resource;

            }
        };




        return ResourceService;
}]);