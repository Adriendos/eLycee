app.controller('AdminPostsCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader', 'Utils',
      function($rootScope, $scope, DataAccess, ENTITY, FileUploader, Utils) {

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
          console.info('id', $scope.currentPost.id);
          DataAccess.delete(ENTITY.post, $scope.currentPost.id).then(function() {
            init();
          });
        };

        // Variable for table sorting
        $scope.sort = {
          column: 'created_at',
          descending: true
        };

        // Check a post status
        $scope.getStatusClass = function(post) {
          if(post.status == 'published') {
            return 'unlock blue';
          }
          return 'lock red';
        }

        $scope.updateStatus = function(post) {
          if(post.status == 'published') {
            post.status = 'unpublished'
          } else {
            post.status = 'published'
          }
          console.info('new status', post.status);
          DataAccess.update(ENTITY.post, post).then( function(data) {
            console.info('ok update', data);
          });
        }

        // Function used to sort the table by clicking headers
        $scope.changeSorting = function($event, column) {

          var sort = $scope.sort;
          var th = $($event.currentTarget);

          if (sort.column == column) {
            sort.descending = !sort.descending;
            if(th.hasClass('ascending')) {
              th.removeClass('ascending').addClass('descending');
              $scope.allPosts = Utils.sortDescending($scope.allPosts, column);
            } else {
              th.removeClass('descending').addClass('ascending');
              $scope.allPosts = Utils.sortAscending($scope.allPosts, column);
            }
          } else {
            $('th').removeClass('descending').removeClass('ascending');
            $($event.currentTarget).addClass('ascending');
            sort.column = column;
            sort.descending = false;
            $scope.allPosts = Utils.sortAscending($scope.allPosts, column);
          }
          $scope.posts = DataAccess.getPage($scope.allPosts, 1);


        };
        
        $scope.openDeletePostModal = function(post) {
          $scope.currentPost = post;
          $('#deletePostModal').modal('show');
        };
      }]);