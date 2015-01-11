app.filter('dateAgo', function() {
    return function(input) {
        if(!input) return;
		return moment( new Date(input) ).subtract(2, 'minutes').utc().fromNow();
    };
});