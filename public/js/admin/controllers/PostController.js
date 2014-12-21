app.controller('PostController', ['$scope', 'AuthFactory', 'PostsFactory',
	function($scope, AuthFactory, PostsFactory) {
		$scope.posts;
    $scope.modal = [];
    
    //Get Posts
		PostsFactory.getAllPosts().then(function(posts) {
      // For correct order by id in table
      angular.forEach(posts, function (post) {
        post.id = parseInt(post.id);
      });
      $scope.posts = posts;
    });
		
		// check user rights
		AuthFactory.checkSession();
		$('.ui.modal').modal();

    //Table
    $scope.sort = {
      column: 'id',
      descending: false
    }; 

    $scope.publicationState = function(post) {
      if(post.status == 'published') {
        return 'unlock blue';
      }
      return 'lock red';
    }

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

    $scope.openCreationModal = function() {
      $('#postModal').modal('show');
      $scope.modal.mode = 'create';
      $('div.ng-pristine.ta-bind').addClass('textarea');
    };

}]);