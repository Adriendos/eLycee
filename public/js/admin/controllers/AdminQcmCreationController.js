app.controller('AdminQcmCreationController',
    ['$scope', '$compile',
        function($scope, $compile) {
            $scope.question = {};
            $scope.nbQuestion = 1;

            $('select.dropdown').dropdown();
            $('.ui.modal').modal();

            $scope.removeQuestion = function($event) {
                $($event.currentTarget).closest('.ui.segment').fadeOut().remove();
                $scope.nbQuestion--;
            };

            $scope.addQuestion = function() {
                var html = '<div class="ui segment">';
                html+= '<div class="ui top attached label small left"><i class="icon question"></i>Question:</div>';
                html+= '<div class="ui top attached label small right remove-question" ng-click="removeQuestion($event);"><i class="icon close"></i> &nbsp;Supprimer cette question</div>';
                html+= '<div class="field">';
                html+= '<label>Question</label>';
                html+= '<input type="text" placeholder="Entrez ici la question" required>';
                html+= '</div>';
                html+= '<div class="fields">';
                html+= '<div class="five wide field">';
                html+= '<label>Bonne réponse <i class="icon checkmark green"></i></label>';
                html+= '<input type="text" placeholder="Entrez la bonne réponse" required>';
                html+= '</div>';
                html+= '<div class="five wide field">';
                html+= '<label>Réponse fausse <i class="icon remove red"></i></label>';
                html+= '<input type="text" placeholder="Mauvaise réponse" required>';
                html+= '</div>';
                html+= '<div class="five wide field">';
                html+= '<label>Réponse fausse <i class="icon remove red"></i></label>';
                html+= '<input type="text" placeholder="Mauvais réponse" required>';
                html+= '</div>';
                html+= '</div>';
                html+= '</div>';

                // pre compile for ng-click working in injected html
                $('#questions').append($compile(html)($scope));

                $('html, body').animate({
                    scrollTop: $('#addQuestionButton').offset().top
                }, 1000);

                $scope.nbQuestion++;
            }

        }]);