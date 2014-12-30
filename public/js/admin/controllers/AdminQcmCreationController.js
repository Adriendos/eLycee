app.controller('AdminQcmCreationController',
    ['$scope', 'PostsFactory',
        function($scope, PostsFactory) {
            $scope.question = {};


            $('select.dropdown').dropdown();
            $('.ui.modal').modal();

            $scope.addQuestionModal = function() {
                $('#addQuestionModal').modal('show');
                $('.ui.checkbox').checkbox();
            };

            $scope.submitQuestion = function() {

            };

        }]);