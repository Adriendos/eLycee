app.factory('DataAccess',
	['$http', '$resource', '$q', 'CONFIG', '$rootScope',
	function($http, $resource, $q, CONFIG, $rootScope) {
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

		DataAccess.getPosts = function() {
			if (DATA_ACCESS.POSTS) {
				console.log('got it from cache !!');
				return DATA_ACCESS.POSTS;
			} else {
				var promise = DataAccess.Post.query().$promise.then(
					function(data, status, headers, config) {
						DATA_ACCESS.POSTS = data;
						return data;
					});
				return promise;
			}
		};

		DataAccess.getQcms = function() {
			if (DATA_ACCESS.QCMS) {
				console.log('got it from cache !!');
				return DATA_ACCESS.QCMS;
			} else {
				var promise = DataAccess.Qcm.query().$promise.then(
					function(data, status, headers, config) {
						DATA_ACCESS.QCMS = data;
						return data;
					});
				return promise;
			}
		};

	    return DataAccess;
}]);
        
