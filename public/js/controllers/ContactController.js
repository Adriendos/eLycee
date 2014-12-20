app.controller('ContactController', ['$scope', function($scope) {
  $scope.$on('mapInitialized', function(event, map) {
    console.log('ready');
    });
}]);