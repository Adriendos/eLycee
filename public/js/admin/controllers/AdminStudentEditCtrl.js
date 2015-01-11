app.controller('AdminStudentEditCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader', '$location', 'SessionService', '$routeParams', 'Utils',
    function($rootScope, $scope, DataAccess, ENTITY, FileUploader, $location, SessionService, $routeParams, Utils) {
    // init vars
    $scope.entity = ENTITY.user;
    $scope.currentPost = {};
    $scope.errorimage = true;

    $('#studentRole').dropdown({
        onChange: function(value, html) {
            $scope.currentPost.role = value;
        }
    });

    if( $routeParams.id ) { // edit existing user
        $scope.mode = 'edit';
        $scope.errorimage = false;
        DataAccess.getDataById($scope.entity, $routeParams.id).then( 
            function(user) {
                $scope.currentPost = user;
                $scope.currentPost.url_thumbnail = $scope.currentPost.profile_picture;
            });
    } else { // create a new user
        if(SessionService.getUser()) {
            $scope.currentPost.user_id = SessionService.getUser().id;
        } else {
            $scope.$watch(SessionService.SESS_INIT, function(newVal, oldVal) {
                if( newVal ) {
                    console.log(SessionService.getUser().id);
                    $scope.currentPost.user_id = SessionService.getUser().id;
                }
            });
        }
        $scope.mode = 'create';
    }

    /**
    * FORM PROCESS 
    **/

    // __ image process
    $scope.uploader = new FileUploader({autoUpload:true});
    $scope.imageFile = false;
    $scope.isFormLoading = false;

    // after image upload
    // @todo remove that and make process image form in directive l. 77

    $scope.uploader.onAfterAddingFile = function(fileItem) {
        $scope.errorimage = false;
        $scope.imageFile = fileItem._file;
        var reader = new FileReader();
        reader.onloadend = function () {
            $scope.currentPost.url_thumbnail = reader.result;
            $scope.currentPost.image = {
                base64: reader.result,
                file: $scope.imageFile
            };
        }
        reader.readAsDataURL($scope.imageFile);
    };

    $scope.$watch('userForm.$valid', function(newVal, oldVal) {
        if( newVal && $scope.errorimage ) {
            $scope.userForm.$valid = false;
        }
    });

    $scope.$watch('errorimage', function(newVal, oldVal) {
        if( !newVal ) {
            $scope.userForm.$valid = true;
        }
    });

    $scope.submitForm = function() {
    // invalid userForm
    if ( $scope.userForm.$invalid) {
        $rootScope.notify('Erreur formulaire', 'error'); 
        $('html, body').animate({ scrollTop: $(document).height() }, 1000);
        return;
    }

    // remove url_thumbnail prop
    delete $scope.currentPost.url_thumbnail;
    $scope.isFormLoading = true;

    if($scope.mode == 'create') {
        if(!$scope.currentPost.user_id) console.log('Gonna fail cause no user id...');
        DataAccess.create(ENTITY.user, $scope.currentPost).then( function(data) {
            closeForm();
        });
    } else {
        DataAccess.update(ENTITY.user, $scope.currentPost).then( function(data) {
            closeForm();
        });
    }          
    };

    function closeForm() {
        $scope.isFormLoading = false;
        $location.path('/admin/users');
    };

    $scope.scrollTo = function(target) {
        return Utils.scrollToStr(target);
    };

    $scope.reset = function() {
        $scope.currentPost = {};
        $('html, body').animate({
            scrollTop: $('html').offset().top
        }, 500);
    };
}]);