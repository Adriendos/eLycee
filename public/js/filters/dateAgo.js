app.filter('dateAgo', function() {
    return function(input) {
        if(!input) return;
		return moment( new Date(input) ).add(1, 'minutes').utc().fromNow();
    };
});