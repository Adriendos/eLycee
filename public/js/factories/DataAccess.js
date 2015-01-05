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

		DataAccess.getDataById = function(entityName, id) {
			var resource = ResourceFactory.getResource(entityName);


			return get(resource, id);
		};

		DataAccess.create = function(entityName, data) {
			var resource = ResourceFactory.getResource(entityName);
			// TODO Add post in cache

			return create(resource, data);
		};

		DataAccess.update = function(entityName, data) {
			var resource = ResourceFactory.getResource(entityName);
			// TODO Update post from cache

			return update(resource, data);
		};

		DataAccess.delete = function(entityName, id) {
			var resource = ResourceFactory.getResource(entityName);
			// TODO Delete post from cache
			return remove(resource, id);
		};

		// Datas NEEDS to be an array !
		DataAccess.getPage = function(datas, page) {
			var start = page*10 -10;
			var end = start + 10;
			return datas.slice(start, end);
		};

		DataAccess.getNbPage = function(datas) {
			console.log(datas);
			if(datas.length%10 != 0) {
				return Math.ceil(datas.length/10);
			} else {
				return datas/10;
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
					$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error');
				});

			return d.promise;
		};

		function create(resource, data) {
			var d = $q.defer();

			var entity = new resource(data);
			entity.user_id = SessionService.getUser().id;
			var result = entity.$save(function() {
				$rootScope.notify('Sauvegarde effectuée avec succès.');
				d.resolve(result);
			},function() {
				$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error');
			});

			return d.promise;
		};

		function update(resource, data) {
			var id = data.id;
			get(resource, id).then(function(entity) {
				$.extend(entity, data); // Replaces entity fields by data fields
				entity.$update(function() {
					$rootScope.notify('Modification effectuée avec succès.');
				});
			});
		};

		function remove(resource, id) {
			get(resource, id).then(function(entity) {
				entity.$delete(function() {
					$rootScope.notify('Suppression effectuée avec succès.');
				});
			});
		};

	    return DataAccess;
}]);
        
