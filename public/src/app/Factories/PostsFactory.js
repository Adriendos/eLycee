app.factory('postsFactory', ['$http', function($http) {
  var urlBase = 'api/v1/posts';
  var postsFactory = {};

  postsFactory.getAllPosts = function () {
    return $http.get(urlBase);
  };

  //put other useful methods here

  return postsFactory;
}]);
