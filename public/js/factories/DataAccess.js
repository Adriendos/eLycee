app.factory('DataAccess',
	['$http', '$resource', '$q', 'CONFIG',
	function($http, $resource, $q, CONFIG) {
		var DataAccess = {},
			apiUrl = CONFIG.apiUrl;

		var DATA_ACCESS = {};

		//Keep separated logic here
		DataAccess.Post = $resource(
			apiUrl + 'posts/:id',
			{id: '@id' },
			{
				query: {method: 'GET', isArray: true},
				get: {method: 'GET', params:{id:'@id'} },
				save: { method: 'POST' }
			}
		);

		DataAccess.Qcm = $resource(
			apiUrl + 'posts/:id',
			{id: '@id' },
			{
				query: {method: 'GET', isArray: true},
				get: {method: 'GET', params:{id:'@id'} },
				save: { method: 'POST' }
			}
		);

		init();

		function init() {

			var posts = DataAccess.Post.query();
			posts.$promise.then(function (result) {
				DATA_ACCESS.POSTS = result;
				console.log(DATA_ACCESS);
			});

			var qcms = DataAccess.Qcm.query();
			qcms.$promise.then(function (result) {
				DATA_ACCESS.QCMS = result;
				console.log(DATA_ACCESS);
			});

			console.log('done');

		};

	  	//PostsFactory.getAllPosts = function () {
	  	//	var deferred = $q.defer();
	    //    PostsFactory.Post.query()
	    //    	.$promise.then(
			//		//success
			//		function(results) {
			//			deferred.resolve(results);
			//		},
			//		//error
			//		function(err) {
			//			console.error(err);
			//		}
		 //       );
        //
	    //   	return deferred.promise;
	    //};
        //
	    //PostsFactory.getPosts = function(limitWantedPosts) {
	    //	var deferred = $q.defer();
	    //	$http.get(apiUrl + 'posts/limit/' + limitWantedPosts)
			//	 .success(function(data, status, headers, config) {
			//	 	deferred.resolve(data);
			//	 })
			//	 .error(function(data, status, headers, config) {
			//	 	deferred.$resolve(data);
			//	 });
        //
	    //   	return deferred.promise;
	    //};
        //
	    //PostsFactory.getPostsPaginated = function(pageNumber) {
	    //	var deferred = $q.defer();
	    //	$http.get(apiUrl + 'posts?page=' + pageNumber)
			//	 .success(function(data, status, headers, config) {
			//	 	deferred.resolve(data);
			//	 })
			//	 .error(function(data, status, headers, config) {
			//	 	deferred.$resolve(data);
			//	 });
        //
	    //   	return deferred.promise;
	    //};
        //
	    //PostsFactory.save = function(saveInfos) {
	    //	console.info('js form', saveInfos);
	    //	var newPost = new PostsFactory.Post(saveInfos);
			//newPost.$save();
	    //};

	    return DataAccess;
}]);
        
