app.factory('postsFactory', ['$http', '$resource', function($http, $resource) {
  return $resource(
        "api/v1/posts/:id",
        {id: "@id" },
        {
<<<<<<< HEAD
            "update": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}}
=======
           query: {method: 'GET', isArray: true},
           get: {method: 'GET', params:{id:'@id'}, isArray: true},
           save: {method: 'POST', isArray: true}
>>>>>>> 775be06ee7f6c6c52bc0e4fee25755adeac06f4d
        }
    );
}]);
