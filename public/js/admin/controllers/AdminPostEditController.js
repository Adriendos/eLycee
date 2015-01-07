app.controller('AdminPostEditCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader', '$location', 'SessionService', '$routeParams',
    function($rootScope, $scope, DataAccess, ENTITY, FileUploader, $location, SessionService, $routeParams) {
    	$scope.entity = ENTITY.post;
      $scope.currentPost = {}; 

      if( $routeParams.id ) {
        $scope.mode = 'edit';
      } else {
        $scope.mode = 'create';
      }
      console.log($scope.mode);
      // Checkbox published
      $scope.currentPost.status = 'unpublished';
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
          // remove url_thumbnail prop 
          // delete $scope.currentPost.url_thumbnail;
          $scope.isFormLoading = true;
          $scope.currentPost.user_id = SessionService.getUser().id;
          if($scope.mode == 'create') {
            DataAccess.create(ENTITY.post, $scope.currentPost).then( function() {
              closeForm();
            });
          } else {
            DataAccess.update(ENTITY.post, $scope.currentPost).then( function() {
              closeForm();
            });
          }          
        };

        function closeForm() {
          $scope.isFormLoading = false;
          $location.path('/admin/articles');
        };

        $scope.reset = function() {
          $scope.currentPost = {};
          $('html, body').animate({
            scrollTop: $('html').offset().top
          }, 500);
        };
    }]);