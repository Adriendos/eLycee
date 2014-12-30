app.controller('AdminDashboardController',['PostsFactory', '$scope', function(PostsFactory, $scope) {
	$('.ui.modal').modal();
    $('.message .close').on('click', function() {
      $(this).closest('.message').fadeOut();
    });

}]);