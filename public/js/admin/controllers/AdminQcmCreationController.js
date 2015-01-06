app.controller('AdminQcmCreationCtrl',
    ['$scope', '$compile', 'Utils',
        function($scope, $compile, Utils) {
            $scope.questions = {};
            $scope.nbQuestion = 1;
            $scope.currentQcm = {};

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
                var guid = Utils.guid();
                $scope.questions[guid] = { content : '', answers: {}};

                var html = [
                    '<div class="ui segment">',
                        '<div class="ui top attached label small left blue"><i class="icon question"></i>Question:</div>',
                        '<div class="ui top attached label small right remove-question" ng-click="removeQuestion($event);">',
                            '<i class="icon close"></i> &nbsp;Supprimer cette question',
                        '</div>',
                        '<div class="field">',
                            '<label>Question</label>',
                            '<input type="text" placeholder="Entrez ici la question" required ng-model="questions[\''+guid+'\'].content">',
                        '</div>',
                        '<div class="fields" id="answers'+guid+'">',
                            '<div class="ui divider invisible"></div>',
                            '<div class="ui button tiny positive" ng-click="addAnswer(\''+guid+'\')">Ajouter une réponse</div>',
                        '</div>',
                    '</div>'
                ].join('');



                // pre compile for ng-click working in injected html
                $('#questions').append($compile(html)($scope));
                $('html, body').animate({
                    scrollTop: $('#addQuestionButton').offset().top
                }, 1000);

                $scope.nbQuestion++;
            };

            $scope.addAnswer = function(questionGuid) {
                var guid = Utils.guid();
                $scope.questions[questionGuid].answers[guid] = { content: '', status: 0};

                var html = [
                    '<div class="two fields">',
                        '<div class="field">',
                            '<label>Réponse</label>',
                            '<input placeholder="Saisissez la réponse" type="text" ng-model="questions[\''+questionGuid+'\'].answers[\''+guid+'\'].content">',
                        '</div>',
                        '<div class="field">',
                            '<label>Valeur</label>',
                            '<div class="ui radio checkbox">',
                            '<input type="radio" name="value'+guid+'" value="1">',
                            '<label>Bonne réponse</label>',
                        '</div>&nbsp;&nbsp;',
                        '<div class="ui radio checkbox checked">',
                            '<input type="radio" name="value'+guid+'" value="0">',
                            '<label>Mauvaise réponse</label>',
                        '</div>',
                    '</div>'
                ].join('');

                $('#answers'+questionGuid).append($compile(html)($scope));
                $('.ui.radio.checkbox')
                    .checkbox('setting', 'onChange' ,function() {
                        $scope.setAnswerStatus(questionGuid, guid, this[0].value);
                    });


                console.log($scope.questions);
            };

            $scope.submitQcm = function() {
                console.log('form submitted');
                console.log($scope.questions);
                console.log($scope.answers);
            };

            $scope.setAnswerStatus = function(questionGuid, answerGuid, val) {
              questions[questionGuid].answers[answerGuid].status = parseInt(val);
            };

        }]);