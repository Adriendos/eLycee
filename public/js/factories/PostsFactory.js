app.factory('postsFactory', ['$http', '$resource', function($http, $resource) {
  return $resource(
        "api/v1/posts/:id",
        {id: "@id" },
        {
           query: {method: 'GET', isArray: true},
           get: {method: 'GET', params:{id:'@id'}, isArray: true},
           save: {method: 'POST', isArray: true}
        }
    );
}]);
