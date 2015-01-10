//app.directive('spinner', ['$rootScope', '$http', function($rootScope, $http) {
//	return {
//		link: function(scope, element, attrs) {
//			scope.isLoading = function () {
//                    return $http.pendingRequests.length > 0;
//                };
//
//            scope.$watch(scope.isLoading, function (v)
//            {
//                if(v){
//                    $(element).fadeIn('slow');
//                }else{
//                    $(element).fadeOut('slow');
//                }
//            });
//		}
//	}
//}]);

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
                            scope.$parent.posts = DataAccess.getPage(scope.datas, page);
                            break;
                        case ENTITY.qcm :

                            scope.$parent.qcms = DataAccess.getPage(scope.datas, page);
                            break;
                    }
                    scope.$parent.currentPage = page;

                }
                // @todo facto make a util of that
                $('html, body').animate({
                    scrollTop: $('html').offset().top
                }, 500);
            };
        }
    }
});

app.directive('comment', function(DataAccess, ENTITY, $route, SessionService, $sanitize) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            comments: '=',
            postId: '='
        },
        templateUrl: 'js/directives/template/comment.html',
        link: function(scope, element, attrs) {
            scope.loggedUserName = ''
            scope.$watch(function(){
                return SessionService.SESS_INIT;
            }, function (newValue) {
                if (SessionService.SESS_INIT == true) {
                    scope.loggedUserName = SessionService.getUser().name();
                }
            });
            scope.commentLimit = 5;

            scope.moreComments = function() {
                scope.commentLimit+= 5;
            }

            scope.comment = { name: scope.loggedUserName || '' , content: '', post_id: scope.postId};
            scope.$parent.$watch('post.id', function(value){
                scope.comment.post_id = value;
            });
            scope.specialField = '';
            scope.postComment = function(){
                if(scope.specialField == '' && scope.newComment.$valid) {
                    scope.comment.name = $sanitize(scope.comment.name);
                    scope.comment.content = $sanitize(scope.comment.content);
                    DataAccess.create(ENTITY.comment, scope.comment).then(function (data) {
                        scope.$parent.reloadComments();
                        scope.newComment.$setPristine(true);
                        scope.comment = { name: '' , content: '', post_id: scope.postId};
                    });
                }
            };
        }
    };
});

app.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        transclude: true,
        scope: false,
        link: function ($scope, elm, attr, ngModel) {
            if (!ngModel) return;

            var ck = CKEDITOR.replace(elm[0]);

            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);
            });

            function updateModel() {
                $scope.$apply(function() {
                    if ( ck.getData().length ) {
                        ngModel.$setViewValue(ck.getData());
                    }
                });
            }

            ck.on('pasteState', updateModel);
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);
            ngModel.$render = function() {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}]);

app.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
})
