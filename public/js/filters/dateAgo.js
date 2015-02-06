app.filter('dateAgo', function() {
    return function(input) {
        if(!input) return;
        var url = window.location.href;

        if( (url.match(/dev/g) || []).length )
            console.log('dev');
        else
            console.log('prod');

		return moment( new Date(input) ).utc().fromNow();
    };
});