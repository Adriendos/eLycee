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
    beforeEach(inject(function ($rootScope, _$location_, SessionService, $controller) {
        scope = $rootScope.$new();
        $location = _$location_;
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

    it('should test if the past is active', function() {
        $location.path('/news');
        expect(scope.isActive('/news')).toBe(true);
        expect(scope.isActive('/contact')).toBe(false);
    });

    it('should test if the past is an admin path', function() {
        $location.path('/admin/articles');
        expect(scope.isAdmin()).toBe(true);
        $location.path('/contact');
        expect(scope.isAdmin()).toBe(false);
    });

    it('should test if the go method sends us to the desired location', function() {
        $location.path('/admin/articles');
        scope.go('/news');
        expect($location.path()).toBe('/news');
    });


});