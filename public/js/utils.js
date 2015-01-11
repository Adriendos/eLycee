app.factory('Utils', [function() {
    var Utils = {}

    Utils.guid = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    Utils.sortDescending = function(dataArray, property) {
        dataArray.sort(function(a, b){
            if(a[property].toLowerCase() < b[property].toLowerCase()) return -1;
            if(a[property].toLowerCase() > b[property].toLowerCase()) return 1;
            return 0;
        });
        return dataArray;
    };

    Utils.sortAscending = function(dataArray, property) {
        dataArray.sort(function(a, b){
            if(a[property].toLowerCase() > b[property].toLowerCase()) return -1;
            if(a[property].toLowerCase() < b[property].toLowerCase()) return 1;
            return 0;
        });
        return dataArray;

    };

    Utils.scrollTop = function() {
        $('html, body').animate({
            scrollTop: $('html').offset().top
        }, 500);
    };

    Utils.scrollTo = function($element) {
        $('html, body').animate({
            scrollTop:$element.offset().top-50
        }, 500);
    };

    Utils.scrollToStr = function(stringAncor) {
        var $el = $('#'+stringAncor);
        $('#'+stringAncor).find('input').focus();
        $('html, body').animate({
            scrollTop: $el.offset().top-50
        }, 500);
    };

    return Utils;
}]);