app.factory('DataAccess',
	['$http', '$resource', '$q', 'CONFIG', '$rootScope', 'ResourceFactory', 'SessionService', '$cacheFactory',
	function($http, $resource, $q, CONFIG, $rootScope, ResourceFactory, SessionService, $cacheFactory) {
		var DataAccess = {},
			apiUrl = CONFIG.apiUrl;

		// Public DataAccess methods, all ajax model queries should use the following methods
		DataAccess.getAllData = function(entityName) {
			var resource = ResourceFactory.getResource(entityName);
			return query(resource);
		};

		DataAccess.getAllData = function(entityName, id) {
			var resource = ResourceFactory.getResource(entityName);
			return nestedQuery(resource, id);
		}

		DataAccess.getDataById = function(entityName, id) {
			var resource = ResourceFactory.getResource(entityName);
			return get(resource, id);
		};

		DataAccess.create = function(entityName, data) {
			var resource = ResourceFactory.getResource(entityName);
			return create(resource, entityName, data);
		};

		DataAccess.update = function(entityName, data) {
			var resource = ResourceFactory.getResource(entityName);
			return update(resource, entityName, data);
		};

		DataAccess.delete = function(entityName, id) {
			var resource = ResourceFactory.getResource(entityName);
			return remove(resource, entityName, id);
		};

		// Datas NEEDS to be an array !
		DataAccess.getPage = function(datas, page) {
			var start = page*10 -10;
			var end = start + 10;
			return datas.slice(start, end);
		};

		DataAccess.getNbPage = function(datas) {
			if(datas.length%10 != 0) {
				return Math.ceil(datas.length/10);
			} else {
				return datas.length/10;
			}
		};

		// Private Resource Methods
		// Intensive use of promises to handle asynchronous requests and responses
		function get(resource, id) {
			var d = $q.defer();
			var start = new Date().getTime(); //performance analyse

			var result = resource.get({ id : id}).$promise.then(
				function(data) {
					d.resolve(result);
					console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
					return data;
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
					$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error');
				});

			return d.promise;
		};

		function nestedQuery(resource, id) {
			var d = $q.defer();
			var start = new Date().getTime();
			var result = resource.query(
				{id: id},
				function(data) {
					d.resolve(result);
					console.log('Time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
				},function() {
					$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error');
				});

			return d.promise;
		};

		function create(resource, entityName, data) {
			var d = $q.defer();

			var entity = new resource(data);
			var result = entity.$save(function() {
				$rootScope.notify('Sauvegarde effectuée avec succès.', 'success');
				clearCache(entityName);
				d.resolve(result);
			},function() {
				$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error');
			});

			return d.promise;
		};

		function update(resource, entityName, data) {
			var id = data.id;
			var d = $q.defer();
			get(resource, id).then(function(entity) {
				angular.extend(entity, data); // Replaces entity fields by data fields

				var result = entity.$update(function() {
					clearCache(entityName, id);
					d.resolve(result);
					$rootScope.notify('Modification effectuée avec succès.','success');
				});
			});
			
			return d.promise;
		};


		function remove(resource, entityName, id) {
			var d = $q.defer();

			get(resource, id).then(function(entity) {
				var result = entity.$delete(function() {
					$rootScope.notify('Suppression effectuée avec succès.','success');
					clearCache(entityName);
					clearCache(entityName, id);
					d.resolve(result);
				});
			});

			return d.promise;
		};

		function clearCache(entityName) {
			var $httpDefaultCache = $cacheFactory.get('$http');
			$httpDefaultCache.remove(CONFIG.apiUrl+entityName);
		};

	    return DataAccess;
}]);
        
