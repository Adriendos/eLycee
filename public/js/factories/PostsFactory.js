app.factory('PostsFactory', ['$http', '$resource', '$q', 'CONFIG',
	function($http, $resource, $q, CONFIG) {
		var PostsFactory = {},
			apiUrl = CONFIG.apiUrl;

		var CACHE = [];

		PostsFactory.Post = $resource(
			apiUrl + 'posts/:id',
			{id: '@id' },
			{
			  query: {method: 'GET', isArray: true},
			  get: {method: 'GET', params:{id:'@id'} },
			  save: { method: 'POST' }
			}
		);

	  	PostsFactory.getAllPosts = function () {

	  		var deferred = $q.defer();
	        PostsFactory.Post.query()
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

	    PostsFactory.getPosts = function(limitWantedPosts) {
	    	var deferred = $q.defer();
	    	$http.get(apiUrl + 'posts/limit/' + limitWantedPosts)
				 .success(function(data, status, headers, config) {
				 	deferred.resolve(data);
				 })
				 .error(function(data, status, headers, config) {
				 	deferred.$resolve(data);
				 });

	       	return deferred.promise;
	    };

	    PostsFactory.save = function(saveInfos) {
	    	console.info('js form', saveInfos);
	    	var newPost = new PostsFactory.Post(saveInfos);
			newPost.$save();
	    };

	    return PostsFactory;
}]);
        
