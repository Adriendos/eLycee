app.controller('AdminQcmCreationController',
    ['$scope', 'PostsFactory',
        function($scope, PostsFactory) {
            $scope.question = {};
            $scope.nbQuestion = 1;


            $('select.dropdown').dropdown();
            $('.ui.modal').modal();
            $('.ui.accordion')
                .accordion()
            ;

            $scope.addQuestionModal = function() {
                $('#addQuestionModal').modal('show');
                $('.ui.checkbox').checkbox();
            };

            $scope.submitQuestion = function() {
                var question = document.createElement('div');
                question.className = 'field white';

                var title = document.createElement('div');
                var icon = document.createElement('i');
                icon.className = 'dropdown icon';
                $(title).append(icon);
                title.className = 'title';
                $(title).append('Question '+ $scope.nbQuestion+ ': ' +$scope.question.title);

                var content = document.createElement('div');
                content.className= 'content';

                var a1 = document.createElement('label');
                a1.innerHTML = 'Reponse 1 : '+ $scope.question.answer1 + '<br>';
                var a2 = document.createElement('label');
                a2.innerHTML = 'Reponse 2 : '+ $scope.question.answer2+ '<br>';
                var a3 = document.createElement('label');
                a3.innerHTML = 'Reponse 3 : '+ $scope.question.answer3+ '<br>';

                $(question).append(title);
                $(content).append(a1);
                $(content).append(a2);
                $(content).append(a3);
                $(question).append(content);

                $('#questions').append(question);
                $scope.nbQuestion ++;
                $('.ui.modal').modal('close').modal('refresh');

            };

        }]);