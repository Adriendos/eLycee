app.controller('AdminStudentEditCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader', '$location', 'SessionService', '$routeParams', 'Utils',
    function($rootScope, $scope, DataAccess, ENTITY, FileUploader, $location, SessionService, $routeParams, Utils) {
      // init vars
      $scope.entity = ENTITY.user;
      $scope.currentUser = {};
      $scope.errorimage = true;

      if( $routeParams.id ) { // edit existing post

        $scope.mode = 'edit';
        $scope.errorimage = false;
        DataAccess.getDataById(ENTITY.post, $routeParams.id).then( 
          function(post) {
            if( post.status == 'published') {
              $('.ui.checkbox').checkbox('check');
            }
            $scope.currentUser = post;
          });
      } else { // create a new post
        if(SessionService.getUser()) {
          $scope.currentUser.user_id = SessionService.getUser().id;
        } else {
          $scope.$watch(SessionService.SESS_INIT, function(newVal, oldVal) {
            if( newVal ) {
              console.log(SessionService.getUser().id);
              $scope.currentUser.user_id = SessionService.getUser().id;
            }
          });
        }
        $scope.mode = 'create';
        $scope.currentUser.status = 'unpublished';
      }

      // Checkbox published
      $('.ui.checkbox').checkbox('setting', 'onChange', function() {
        var inputVal = this[0].checked;
        if( inputVal ) {
          $scope.currentUser.status = 'published';
        } else {
          $scope.currentUser.status = 'unpublished';
        }
      });

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
            $scope.currentUser.url_thumbnail = reader.result;
            $scope.currentUser.image = {
                base64: reader.result,
                file: $scope.imageFile
              };
          }
          reader.readAsDataURL($scope.imageFile);
        };

        $scope.$watch('postForm.$valid', function(newVal, oldVal) {
          if( newVal && $scope.errorimage ) {
            $scope.postForm.$valid = false;
          }
        });

        $scope.$watch('errorimage', function(newVal, oldVal) {
          if( !newVal ) {
            $scope.postForm.$valid = true;
          }
        });

        $scope.submitForm = function() {
          // invalid postForm
          if ( $scope.postForm.$invalid) {
            $rootScope.notify('Erreur formulaire', 'error'); 
            $('html, body').animate({ scrollTop: $(document).height() }, 1000);
            return;
          }

          // remove url_thumbnail prop
          delete $scope.currentUser.url_thumbnail;
          $scope.isFormLoading = true;

          if($scope.mode == 'create') {
            if(!$scope.currentUser.user_id) console.log('Gonna fail cause no user id...');
            DataAccess.create(ENTITY.post, $scope.currentUser).then( function(data) {
              closeForm();
            });
          } else {
            DataAccess.update(ENTITY.post, $scope.currentUser).then( function(data) {
              closeForm();
            });
          }          
        };

        function closeForm() {
          $scope.isFormLoading = false;
          $location.path('/admin/posts');
        };

        $scope.scrollTo = function(target) {
          return Utils.scrollToStr(target);
        };

        $scope.reset = function() {
          $scope.currentUser = {};
          $('html, body').animate({
            scrollTop: $('html').offset().top
          }, 500);
        };
    }]);