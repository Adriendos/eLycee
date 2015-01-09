app.filter('dateToISO', function() {
    return function(input) {
        if(!input) {
            return '';
        }
        return new Date(input).getTime();
    };
});