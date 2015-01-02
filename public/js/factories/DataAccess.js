app.factory('DataAccess',
	['$http', '$resource', '$q', 'CONFIG', '$rootScope', 'ResourceFactory',
	function($http, $resource, $q, CONFIG, $rootScope, ResourceFactory) {
		var DataAccess = {},
			apiUrl = CONFIG.apiUrl;


		DataAccess.getAllData = function(entityName) {
			var resource = ResourceFactory.getResource(entityName);

			return query(resource, entityName);
		};

		DataAccess.getDataById = function(entityName, id) {
			var resource = ResourceFactory.getResource(entityName);

			return get(resource, id, entityName);
		};

		function get(resource, id) {
			var d = $q.defer();
			var start = new Date().getTime();

			var result = resource.get({ id : id}).$promise.then(
				function(data) {
					d.resolve(result);
					console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
					return data[0];
				},function() {
					$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
				});

			return d.promise;
		};

		function query(resource) {
			var d = $q.defer();
			var start = new Date().getTime();
			var result = resource.query(
				function(data) {
					d.resolve(result);
					console.log('Time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
				},function() {
					$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
				});

			return d.promise;
		};

	    return DataAccess;
}]);
        
