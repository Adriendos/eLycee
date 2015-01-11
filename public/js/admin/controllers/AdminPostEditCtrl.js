app.controller('AdminPostEditCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader', '$location', 'SessionService', '$routeParams', 'Utils',
    function($rootScope, $scope, DataAccess, ENTITY, FileUploader, $location, SessionService, $routeParams, Utils) {
      // init vars
      $scope.entity = ENTITY.post;
      $scope.currentPost = {};
      $scope.errorimage = true;
      $('.ui.dropdown').dropdown();
      $('#logout').dropdown({
              action: 'nothing'
          });

      if( $routeParams.id ) { // edit existing post

        $scope.mode = 'edit';
        $scope.errorimage = false;
        DataAccess.getDataById(ENTITY.post, $routeParams.id).then( 
          function(post) {
            if( post.status == 'published') {
              $('.ui.checkbox').checkbox('check');
            }
            $scope.currentPost = post;
          });
      } else { // create a new post
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
        $scope.currentPost.status = 'unpublished';
      }

      // Checkbox published
      $('.ui.checkbox').checkbox('setting', 'onChange', function() {
        var inputVal = this[0].checked;
        if( inputVal ) {
          $scope.currentPost.status = 'published';
        } else {
          $scope.currentPost.status = 'unpublished';
        }
      });

      /**
        * FORM PROCESS 
        **/

        // __ image process
        $scope.uploader = new FileUploader({autoUpload:true});
        $scope.imageFile = false;

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
          delete $scope.currentPost.url_thumbnail;

          if($scope.mode == 'create') {
            DataAccess.create(ENTITY.post, $scope.currentPost).then( function(data) {
              closeForm();
            });
          } else {
            DataAccess.update(ENTITY.post, $scope.currentPost).then( function(data) {
              closeForm();
            });
          }          
        };

        function closeForm() {
          $location.path('/admin/posts');
          $('html, body').animate({ scrollTop: 0 }, 1000);
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