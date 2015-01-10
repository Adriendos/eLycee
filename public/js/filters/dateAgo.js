app.filter('dateAgo', function() {
    return function(input) {
        if(!input) return;
		// moment().utc();
		console.info('date', input);
		return moment( new Date(input) ).utc().fromNow();
    };
});