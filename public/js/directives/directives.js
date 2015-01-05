app.directive('spinner', ['$rootScope', '$http', function($rootScope, $http) {
	return {
		link: function(scope, element, attrs) {
			scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    $(element).fadeIn('slow');
                }else{
                    $(element).fadeOut('slow');
                }
            });
		}
	}
}]);

app.directive('twitter', ['$location', function($location) {
    var twitter = $('twitter');
    twitter.remove();
    return {
        restrict: 'E',
        templateUrl: 'js/directives/template/twitter-widget.html'
    };
}]);

app.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);

//app.directive( 'pagination', [
//    '$rootScope',
//    function($rootScope) {
//    return {
//        restrict: 'A',
//        scope: { results: '=pagination' },
//        templateUrl: 'js/directives/template/pagination.html',
//
//        link: function( scope, elem, attr ) {
//
//            var paginate = function( results ) {
//                if ( !scope.currentPage ) scope.currentPage = 0;
//
//                scope.total = results.length;
//                scope.totalPages = results.last_page;
//                scope.pages = [];
//
//                for ( var i = 1; i <= scope.totalPages; i++ ) {
//                    scope.pages.push( i );
//                }
//
//                scope.nextPage = function() {
//                    if ( scope.currentPage < scope.totalPages ) {
//                        scope.currentPage++;
//                    }
//                };
//
//                scope.prevPage = function() {
//                    if ( scope.currentPage > 1 ) {
//                        scope.currentPage--;
//                    }
//                };
//
//                scope.firstPage = function() {
//                    scope.currentPage = 1;
//                };
//
//                scope.lastPage = function() {
//                    scope.currentPage = scope.totalPages;
//                };
//
//                scope.setPage = function(page) {
//                    scope.currentPage = page;
//                };
//            };
//
//            var pageChange = function( newPage, lastPage ) {
//                if ( newPage != lastPage ) {
//                    $rootScope.$emit( 'page.changed', newPage );
//                }
//            };
//
//            scope.$watch( 'results', paginate );
//            scope.$watch( 'currentPage', pageChange );
//        }
//    }
//}]);

app.directive('imgUploader', [ function() {

    return {
        restrict: 'A',
        templateUrl: 'js/directives/template/image-uploader.html',
        link: function(scope, element, attributes) {
            var params = scope.$eval(attributes.imgUploader);
        }
    };
}]);

app.directive('pagination', function() {
    return {
        restrict: 'E',
        scope: {
            nbPages: '=nbPages'
        },
        templateUrl: 'js/directives/template/pagination.html',
        link: function( scope, elem, attr ) {
            scope.nbPages = nbPages;
        }
    }
});
