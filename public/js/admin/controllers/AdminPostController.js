app.controller('AdminPostCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader',
      function($rootScope, $scope, DataAccess, ENTITY, FileUploader) {

        $scope.posts;
        $scope.modal = [];
        $scope.currentPage = 1;
        $scope.entity = ENTITY.post;

        $('.ui.modal').modal();

        init();

        function init() {
          DataAccess.getAllData(ENTITY.post).then(
              function(posts) {
                angular.forEach(posts, function (post) {
                  post.id = parseInt(post.id); //We parse the post.id so that we can sort the table
                });
                $scope.allPosts = posts;
                $scope.posts = DataAccess.getPage($scope.allPosts, 1);
                $scope.nbPages = DataAccess.getNbPage(posts);
              }
          );
        };

        $scope.submitForm = function() {
          //// Do form checkings here :)
          //if($scope.modal.mode == 'create') {
          //  DataAccess.create(ENTITY.post, $scope.currentPost);
          //} else {
          //  DataAccess.update(ENTITY.post, $scope.currentPost);
          //}
          //
          //$('.ui.modal').modal('close');
          alert('couille');
        };

        $scope.deletePost = function() {
          DataAccess.delete(ENTITY.post, $scope.currentPost.id);
          init();
        };

        // Variable for table sorting
        $scope.sort = {
          column: 'created_at',
          descending: true
        };

        // Check a post status
        $scope.publicationState = function(post) {
          if(post.status == 'published') {
            return 'unlock blue';
          }
          return 'lock red';
        }

        // Function used to sort the table by clicking headers
        $scope.changeSorting = function($event, column) {
          var sort = $scope.sort;
          var th = $($event.currentTarget);
          if (sort.column == column) {
            sort.descending = !sort.descending;
            if(th.hasClass('ascending')) {
              th.removeClass('ascending').addClass('descending');
            } else {
              th.removeClass('descending').addClass('ascending');
            }
          } else {
            $('th').removeClass('descending').removeClass('ascending');
            $($event.currentTarget).addClass('ascending');
            sort.column = column;
            sort.descending = false;
          }
        };

        function openPostModal() {
          $('#postModal').modal('show').modal("refresh");
          $('div.ng-pristine.ta-bind').addClass('textarea');
        };

        $scope.openDeletePostModal = function(post) {
          $scope.currentPost = post;
          $('#deletePostModal').modal('show');
        };

        $scope.openCreationModal = function() {
          $scope.currentPost = [];
          $scope.modal.mode = 'create';
          openPostModal();
          $('.ui.checkbox').checkbox();
        };

        $scope.openEditionModal = function(post) {
          $scope.currentPost = post;
          $scope.modal.mode = 'edit';
          openPostModal();
          $('.ui.checkbox').checkbox().prop('checked',post.status=='published');
        };

        // __ image process
        $scope.uploader = new FileUploader({autoUpload:true});
        // CALLBACKS
        $scope.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        $scope.uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        $scope.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        $scope.uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        $scope.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        $scope.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        console.info('uploader', $scope.uploader);
        // => @todo
        // $scope.uploader.onComplete( function(response, status, headers){
        //   console.log(response);
        // });

        //$scope.submitForm = function() { // @todo verif fields not empty etc ...
        //  var ngUploader = $scope.uploader.queue[0];
        //  if(!angular.isUndefined(ngUploader)) { // has image ?
        //    var imageFile = ngUploader._file;
        //    var reader = new FileReader();
        //    reader.onloadend = function () {
        //      $scope.currentPost.image = {
        //        base64: reader.result,
        //        file: imageFile
        //      };
        //      PostsFactory.save($scope.currentPost);
        //    }
        //    reader.readAsDataURL(imageFile);
        //  } else {
        //    PostsFactory.save($scope.currentPost);
        //  }
        //};
      }]);