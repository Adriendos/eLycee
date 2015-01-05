app.factory('ResourceFactory', ['$resource', 'CONFIG',
    function($resource, CONFIG) {

        var ResourceService = {};

        var apiUrl = CONFIG.apiUrl;

        var RESOURCES = {};

        //Generic resource generator
        ResourceService.getResource = function(entityName) {
            if(RESOURCES[entityName]) {
                return RESOURCES[entityName];
            } else {
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