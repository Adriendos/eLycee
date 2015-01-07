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

app.directive('twitterw', ['$location', function($location) {
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

app.directive('imgUploader', [ function() {
    return {
        restrict: 'A',
        templateUrl: 'js/directives/template/image-uploader.html',
        link: function(scope, element, attributes) {
            // @todo remove that and make process image form here
            var params = scope.$eval(attributes.imgUploader);
        }
    };
}]);

app.directive('pagination',  function(DataAccess, ENTITY) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            pages: '=',
            currentPage: '=',
            nbPages: '=',
            datas: '=',
            entity: '='
        },
        templateUrl: 'js/directives/template/pagination.html',
        link: function (scope, element, attrs) {
            scope.switchPage = function(page) {
                if( (page > 0) && (page < scope.nbPages + 1)) {
                    switch (scope.entity) {
                        case ENTITY.post :
                            console.log('debut');
                            scope.$parent.posts = DataAccess.getPage(scope.datas, page);
                            console.log('fin');
                            break;
                        case ENTITY.qcm :

                            scope.$parent.qcms = DataAccess.getPage(scope.datas, page);
                            break;
                    }
                    scope.$parent.currentPage = page;

                }
                $('html, body').animate({
                    scrollTop: $('html').offset().top
                }, 500);
            };
        }
    }
});

app.directive('comment', function(DataAccess, ENTITY) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            postId: '=postId',
            comments: '='
        },
        templateUrl: 'js/directives/template/comment.html',
        link: function(scope, element, attrs) {
            scope.specialField = '';
            scope.comment = { name: 'zizi' , content: '', post_id: 1};
            console.log(scope);
            scope.postComment = function(){
                console.log(scope.comment);
                DataAccess.create(ENTITY.comment, scope.comment).then(function(data){
                    console.log('good');
                });
            };
        }
    };
});

app.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0]);

            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}]);
