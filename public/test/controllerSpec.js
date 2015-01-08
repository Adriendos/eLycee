describe('Controller: HomeCtrl', function() {
    // Instantiate a new version of the module
    beforeEach(module('eLycee'));

    var scope, ctrl;

    // Before each unit test instantiate the controller
    beforeEach(inject(function($controller, $rootScope, DataAccess, ENTITY) {
        scope = $rootScope.$new();
        mock = {
            $scope: scope,
            DataAccess: DataAccess,
            ENTITY : ENTITY
        }
        ctrl = $controller('HomeCtrl', mock);
    }));

    // TESTS
    it('should be defined', function() {
        expect(ctrl).toBeDefined();
    });

    it('should have posts after request', function() {
        // check here if $scope.posts contains posts
    });
});

describe('Controller: RootCtrl', function() {
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
        ctrl = $controller('RootCtrl', mock);
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
        $location.path('/admin/posts');
        expect(scope.isAdmin()).toBe(true);
        $location.path('/contact');
        expect(scope.isAdmin()).toBe(false);
    });

    it('should test if the go method sends us to the desired location', function() {
        $location.path('/admin/posts');
        scope.go('/news');
        expect($location.path()).toBe('/news');
    });


});