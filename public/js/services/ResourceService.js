app.factory('ResourceFactory', ['$resource', 'CONFIG', 'ENTITY',
    function($resource, CONFIG, ENTITY) {

        var ResourceService = {};

        var apiUrl = CONFIG.apiUrl;

        var RESOURCES = {};

        //Generic resource generator
        ResourceService.getResource = function(entityName) {
            if(RESOURCES[entityName]) {
                return RESOURCES[entityName];
            } else {
                switch(entityName) {
                    case ENTITY.question :
                        return $resource(
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
                        return $resource(
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
                        return $resource(
                            apiUrl + entityName + '/:id',
                            {
                                id: '@id'
                            },
                            {
                                query: {method: 'GET', isArray: true, cache: true},
                                get: {method: 'GET', params: {id: '@id'}, isArray: false, cache : true},
                                save: {method: 'POST'},
                                update: { method:'PUT' }
                            }

                        );
                        break;
                }

                var resource = $resource(
                    apiUrl + entityName + '/:id',
                    {
                        id: '@id'
                    },
                    {
                        query: {method: 'GET', isArray: true, cache: true},
                        get: {method: 'GET', params: {id: '@id'}, isArray: true, cache : true},
                        save: {method: 'POST'},
                        update: { method:'PUT' }
                    }
                );

                RESOURCES[entityName] = resource;

                return resource;
            }
        };

        return ResourceService;
}]);