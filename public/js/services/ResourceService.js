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
                            apiUrl + "/qcm/:qcm_id/question/:id",

                            {
                                query: {method: 'GET',params: {user_id: "@qcm_id"}, isArray: true, cache: true},
                                get: {method: 'GET', params: {user_id: "@qcm_id", id: "@id"}, isArray: true, cache : true},
                                save: {method: 'POST'},
                                update: { method:'PUT' }
                            }

                        );
                        break;
                    case ENTITY.answer :
                        resource = $resource(
                            apiUrl + "/question/:question_id/answer/:id",

                            {
                                query: {method: 'GET',params: {user_id: "@question_id"}, isArray: true, cache: true},
                                get: {method: 'GET', params: {user_id: "@question_id", id: "@id"}, isArray: true, cache : true},
                                save: {method: 'POST'},
                                update: { method:'PUT' }
                            }

                        );
                        break;
                    case ENTITY.comment :
                        // TODO
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

                //Wrap resource to secure api with token
                //resource = TokenHandler.wrapActions(resource, ["query", "update", "save"] );
                //console.log(resource);
                return resource;

            }
        };




        return ResourceService;
}]);