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

        $scope.postForm = function() {
          // Do form checkings here :)
          if($scope.modal.mode == 'create') {
            DataAccess.create(ENTITY.post, $scope.currentPost);
          } else {
            DataAccess.update(ENTITY.post, $scope.currentPost);
          }

          $('.ui.modal').modal('close');
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
        $scope.imageFile = false;

        // CALLBACKS
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

        $scope.submitForm = function() { // @todo verif fields not empty etc ...
          console.info('test', $scope.currentPost);
          PostsFactory.save($scope.currentPost);
        };
      }]);