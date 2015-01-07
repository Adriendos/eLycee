app.controller('AdminQcmEditCtrl',
    ['$scope', '$compile', 'Utils','ENTITY', 'DataAccess', 'SessionService',
        function($scope, $compile, Utils, ENTITY, DataAccess, SessionService) {
            $scope.questions = {};
            $scope.nbQuestion = 1;
            $scope.currentQcm = {
                title: '',
                description: '',
                class_level: ''
            };

            $('#validateQcm').modal();
            $('select.dropdown').dropdown('setting', 'onChange' ,function() {
                $scope.currentQcm.class_level = $(this).dropdown('get value')
            });

            $('.ui.modal').modal();

            $scope.removeQuestion = function($event) {
                var segment = $($event.currentTarget).closest('.ui.segment');
                var id = segment.data('id');

                delete $scope.questions[id];
                console.log($scope.questions);

                segment.fadeOut().remove();

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
                $scope.questions[guid] = { content : '', answers: {} };

                var html = [
                    '<div class="ui segment" data-id="'+guid+'">',
                        '<div class="ui top attached label small left blue"><i class="icon help"></i>Question:</div>',
                            '<div class="ui top attached label small right remove-question" ng-click="removeQuestion($event);">',
                                '<i class="icon close"></i> &nbsp;Supprimer',
                            '</div>',
                        '<div class="invisible ui divider"></div>',
                        '<div class="field">',
                            '<label><i class="icon help"></i>Question</label>',
                            '<input type="text" placeholder="Entrez ici la question" required ng-model="questions[\''+guid+'\'].content">',
                        '</div>',
                        '<div class="ui divider"></div>',
                         '<div class="field" id="answers'+guid+'">',
                            '<div class="ui button tiny positive" ng-click="addAnswer(\''+guid+'\')">Ajouter une réponse</div>',
                        '</div>',
                    '</div>'
                ].join('');



                // pre compile for ng-click working in injected html
                $('#questions').append($compile(html)($scope));
                $('html, body').animate({
                    scrollTop: $('#addQuestionButton').offset().top
                }, 1000);

            };

            $scope.addAnswer = function(questionGuid) {
                var guid = Utils.guid();
                $scope.questions[questionGuid].answers[guid] = { content: '', status: 0};


                var html = [
                    '<div class="two fields">',
                    '<div class="field">',
                    '<label><i class="icon certificate"></i>Réponse</label>',
                    '<input placeholder="Saisissez la réponse" type="text" ng-model="questions[\''+questionGuid+'\'].answers[\''+guid+'\'].content">',
                    '</div>',
                    '<div class="field">',
                    '<label>Valeur</label>',
                    '<div class="ui radio checkbox">',
                    '<input type="radio" name="value'+guid+'" value="1">',
                    '<label>Bonne réponse</label>',
                    '</div>&nbsp;&nbsp;',
                    '<div class="ui radio checkbox">',
                    '<input type="radio" name="value'+guid+'" value="0" ng-model="questions[\''+questionGuid+'\'].answers[\''+guid+'\'].status">',
                    '<label>Mauvaise réponse</label>',
                    '</div>',
                    '</div>'
                ].join('');

                $('#answers'+questionGuid).prepend($compile(html)($scope));
                $('.ui.radio.checkbox')
                    .checkbox('setting', 'onChange' ,function() {
                        $scope.setAnswerStatus(questionGuid, guid, this[0].value);
                    });

                $('html, body').animate({
                    scrollTop: $('#answers'+questionGuid).offset().top
                }, 1000);

            };

            $scope.submitQcm = function() {
                $scope.currentQcm.questions = [];
                angular.forEach($scope.questions, function(question) {
                    answers = question.answers;
                    question.answers = [];
                    angular.forEach(answers, function(answer) {
                        question.answers.push(answer);
                    });
                    $scope.currentQcm.questions.push(question);

                });

                console.log($scope.currentQcm);
                //create qcm here
            };

            $scope.setAnswerStatus = function(questionGuid, answerGuid, val) {
                $scope.questions[questionGuid].answers[answerGuid].status = parseInt(val);
            };

            $scope.openValidateQcmModal = function() {
                $('#validateQcm').modal('show');
            };

        }]);