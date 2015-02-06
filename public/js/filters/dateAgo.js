app.filter('dateAgo', function() {
    return function(input) {
        if(!input) return;

        if( ENV === 'prod' )
            return moment( new Date(input) ).add(30, 'seconds').utc().fromNow();

		return moment( new Date(input) ).utc().fromNow();
    };
});