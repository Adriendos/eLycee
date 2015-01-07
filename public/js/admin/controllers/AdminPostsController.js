app.controller('AdminPostsCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader',
      function($rootScope, $scope, DataAccess, ENTITY, FileUploader) {

        $scope.posts;
        $scope.modal = [];
        $scope.currentPage = 1;
        $scope.entity = ENTITY.post;
        $scope.currentPost = {};

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
        
        $scope.openDeletePostModal = function(post) {
          $scope.currentPost = post;
          $('#deletePostModal').modal('show');
        };
      }]);