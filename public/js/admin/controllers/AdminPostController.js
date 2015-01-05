app.controller('AdminPostCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader',
      function($rootScope, $scope, DataAccess, ENTITY, FileUploader) {

        $scope.posts;
        $scope.modal = [];

        $('.ui.modal').modal();

        DataAccess.getAllData(ENTITY.post).then(
            function(posts) {
              angular.forEach(posts, function (post) {
                post.id = parseInt(post.id); //We parse the post.id so that we can sort the table
              });
              $scope.posts = posts;
            }
        );

        $scope.postForm = function() {
          console.info('Submitted Form');
          console.log($scope.currentPost);

          // Do form checkings here :)

          if($scope.modal.mode == 'create') {
            DataAccess.create(ENTITY.post, $scope.currentPost);
          } else {
            DataAccess.update(ENTITY.post, $scope.currentPost);
          }

          $('.ui.modal').modal('close');


        };

        // Variable for table sorting
        $scope.sort = {
          column: 'id',
          descending: false
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

        $scope.uploader = new FileUploader({autoUpload:true});
        $scope.submitForm = function() { // @todo verif fields not empty etc ...
          var ngUploader = $scope.uploader.queue[0];
          if(!angular.isUndefined(ngUploader)) { // has image ?
            var imageFile = ngUploader._file;
            var reader = new FileReader();
            reader.onloadend = function () {
              $scope.currentPost.image = {
                base64: reader.result,
                file: imageFile
              };
              PostsFactory.save($scope.currentPost);
            }
            reader.readAsDataURL(imageFile);
          } else {
            PostsFactory.save($scope.currentPost);
          }
        };

        // pagination listener
        $rootScope.$on('page.changed', function(e, pageNum) {
          PostsFactory.getPostsPaginated(pageNum).then( function(posts) {
            $scope.posts = posts;
          });
        });

        // var can = document.getElementById('canvas');
        // var ctx = can.getContext('2d');
        // var img = document.getElementById('tweetpic');
        // ctx.drawImage(img, 0, 0);
        // var b64Text = can.toDataURL();
        // b64Text = b64Text.replace('data&colon;image/png;base64,','');
        // var fileData = b64Text;

        // $scope.uploader.onAfterAddingFile = function(fileItem) {
        //   console.info('onAfterAddingFile', fileItem);
        // };
      }]);