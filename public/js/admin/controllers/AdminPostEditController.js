app.controller('AdminPostEditCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader', '$location', 'SessionService', '$routeParams',
    function($rootScope, $scope, DataAccess, ENTITY, FileUploader, $location, SessionService, $routeParams) {
      // init vars
    	$scope.entity = ENTITY.post;
      $scope.currentPost = {};
      $scope.errorimage = true; 

      $scope.modelInit = false;

      if( $routeParams.id ) { // edit existing post
        $scope.mode = 'edit';
        $scope.errorimage = false;
        DataAccess.getDataById(ENTITY.post, $routeParams.id).then( 
          function(post) {
            if( post.status == 'published') {
              $('.ui.checkbox').checkbox('check');
            }
            $scope.currentPost = post;
            $scope.modelInit = true;
          });
      } else { // create a new post
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

        $scope.submitForm = function() { // @todo loadee ...
          // invalid postForm
          if ( ! $scope.postForm.$valid) return;
          // remove url_thumbnail prop
          delete $scope.currentPost.url_thumbnail;
          $scope.isFormLoading = true;
          $scope.currentPost.user_id = SessionService.getUser().id;

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
          $scope.isFormLoading = false;
          $location.path('/admin/posts');
        };

        function _validInput(dataInputVal) {
          if( ! dataInputVal) {

          }
        }

        $scope.reset = function() {
          $scope.currentPost = {};
          $('html, body').animate({
            scrollTop: $('html').offset().top
          }, 500);
        };
    }]);