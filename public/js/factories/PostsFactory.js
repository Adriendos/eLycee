app.factory('postsFactory', ['$http', '$resource', function($http, $resource) {
	var postsFactory = {};

	postsFactory.resource = $resource(
		"api/v1/posts/:id",
		{id: "@id" },
		{
		  query: {method: 'GET', isArray: true},
		  get: {method: 'GET', params:{id:'@id'}, isArray: true},
		  save: {method: 'POST', isArray: true}
		}
	);

  	postsFactory.getAllPosts = function () {
        postsFactory.resource.query().$promise.then(
	          //success
	          function(results) {
	          	console.log(results);
	            return results[0];
	          },
	          //error
	          function(err) {
	            console.error(err);
	          }
	        );
    };
    return postsFactory;
}]);
