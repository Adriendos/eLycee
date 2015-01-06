app.service('tweetsWidgetService', function() {

    this.loadAllWidgets = function() {

        /* widgets loader code you get when 
         * declaring you widget with Twitter 
         * this code is the same for all widgets 
         * so calling it once will reference whatever
         * widgets are active in the current ng-view */

        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
     };

     this.destroyAllWidgets = function() {
        var $ = function (id) { return document.getElementById(id); };
        var twitter = $('twitter-wjs');
        if (twitter != null)
            twitter.remove();
     };  
     
});