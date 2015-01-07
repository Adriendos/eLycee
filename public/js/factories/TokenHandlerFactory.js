app.factory('TokenHandler', ['SessionService', function(SessionService) {
    var tokenHandler = {};
    var token = "none";

    tokenHandler.get = function() {
        return SessionService.getToken();

    };

    // wraps given actions of a resource to send auth token
    // with every request
    tokenHandler.wrapActions = function( resource, actions ) {
        // copy original resource
        var wrappedResource = resource;
        // loop through actions and actually wrap them
        for (var i=0; i < actions.length; i++) {
            tokenWrapper( wrappedResource, actions[i] );
        };
        // return modified copy of resource
        return wrappedResource;
    };

    // wraps resource action to send request with auth token
    var tokenWrapper = function( resource, action ) {
        // copy original action
        resource['_' + action]  = resource[action];
        // create new action wrapping the original
        // and sending token
        resource[action] = function( data, success, error){
            return resource['_' + action](
                // call action with provided data and
                // appended access_token
                angular.extend({}, data || {},
                    {auth_token: tokenHandler.get()}),
                success,
                error
            );
        };
    };

    return tokenHandler;
}]);