app.controller('AdminQcmCreationCtrl',
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

            $scope.addQuestion = function() {
                var html = '<div class="ui segment">';
                html+= '<div class="ui top attached label small left blue"><i class="icon question"></i>Question:</div>';
                html+= '<div class="ui top attached label small right remove-question" ng-click="removeQuestion($event);"><i class="icon close"></i> &nbsp;Supprimer cette question</div>';
                html+= '<div class="field">';
                html+= '<label>Question</label>';
                html+= '<input type="text" placeholder="Entrez ici la question" required>';
                html+= '</div>';
                html+= '<div class="fields" id="answers">';
                html+= '<div class="ui divider invisible"></div>';
                html+= '<div class="ui button tiny positive" ng-click="addAnswer()">Ajouter une réponse</div>';
                html+= '</div>';

                // pre compile for ng-click working in injected html
                $('#questions').append($compile(html)($scope));

                $('html, body').animate({
                    scrollTop: $('#addQuestionButton').offset().top
                }, 1000);

                $scope.nbQuestion++;
            };

            $scope.addAnswer = function() {
                var html = '<div class="two fields">';
                html+= '<div class="field">';
                html+= '<label>Réponse</label>';
                html+= '<input placeholder="Saisissez la réponse" type="text">';
                html+= '</div>';
                html+= '<div class="field">';
                html+= '<label>Valeur</label>';
                html+= '<div class="ui radio checkbox">';
                html+= '<input type="radio" name="value" checked="">';
                html+= '<label>Bonne réponse</label>';
                html+= '</div>';
                html+= '&nbsp;&nbsp;'
                html+= '<div class="ui radio checkbox">';
                html+= '<input type="radio" name="value" checked="">';
                html+= '<label>Mauvaise réponse</label>';
                html+= '</div>';
                html+= '</div>';
                html+= '</div>';

                $('#answers').append($compile(html)($scope));
            };

            $scope.submitQcm = function() {
                console.log('form submitted');
            }


        }]);