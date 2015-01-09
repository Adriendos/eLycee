app.filter('dateAgo', function() {
    return function(input) {
        if(!input) {
            return;
        }
        var a = moment(new Date());
		var b = moment(new Date(input));

        return b.from(a);
    };
});