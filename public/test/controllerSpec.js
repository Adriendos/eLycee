describe('Controller: HomeController', function() {
    // Instantiate a new version of the module
    beforeEach(module('eLycee'));

    var scope, ctrl;

    // Before each unit test instantiate the controller
    beforeEach(inject(function($controller, $rootScope, PostsFactory) {
        scope = $rootScope.$new();
        mock = {
            $scope: scope,
            PostsFactory: PostsFactory
        }
        ctrl = $controller('HomeController', mock);
    }));

    // TESTS
    it('should be defined', function() {
        expect(ctrl).toBeDefined();
    });

    it('should have posts after request', function() {
        // check here if $scope.posts contains posts
    });
});

describe('Controller: RootController', function() {
    // Instantiate a new version of the module
    beforeEach(module('eLycee'));

    var scope, ctrl;

    // Before each unit test instantiate the controller
    beforeEach(inject(function ($controller, $rootScope, $location, SessionService) {
        scope = $rootScope.$new();
        mock = {
            $scope: scope,
            $location: $location,
            SessionService: SessionService
        }
        ctrl = $controller('RootController', mock);
    }));

    // TESTS
    it('should be defined', function() {
        expect(ctrl).toBeDefined();
    });



});