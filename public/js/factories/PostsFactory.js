app.factory('postsFactory', ['$http', '$resource', function($http, $resource) {
  return $resource(
        "/api/v1/posts/:id",
        {id: "@id" },
        {
            "update": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
        }
    );
}]);
