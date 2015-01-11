app.controller('AdminQcmEditCtrl',
    ['$scope', '$compile', 'Utils','ENTITY', 'DataAccess', 'SessionService', '$location',
        function($scope, $compile, Utils, ENTITY, DataAccess, SessionService, $location) {
            $scope.questions = {};
            $scope.nbQuestion = 1;
            $scope.formError = false;
            $scope.formErrors = {};
            $scope.currentQcm = {
                title: '',
                description: '',
                class_level: ''
            };
            console.info('$scope.formError', $scope.formError);
            $('#validateQcm').modal();

            $("#classDropdown").dropdown({
                onChange: function (val) {
                    $scope.currentQcm.class_level = val;
                }
            });

            $('.ui.modal').modal();

            $scope.removeQuestion = function($event) {
                var segment = $($event.currentTarget).closest('.ui.segment');
                var id = segment.data('id');

                delete $scope.questions[id];

                segment.fadeOut().remove();

                $scope.nbQuestion--;
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
                    '<div class="ui error form" ng-show="newQcm.$submitted && questions[\''+guid+'\'].noAnswer ">',
                    '<div class="ui error small message">',
                    '<div class="header">',
                        'Veuillez renseigner au minimum deux réponses dont une bonne réponse',
                    '</div>',
                    '</div>',
                    '</div>',
                        '<div class="field" ng-class="{ error: newQcm.$submitted && questions[\''+guid+'\'].contentError }">',
                            '<label><i class="icon help"></i>Question</label>',
                            '<input id="question'+guid+'" type="text" placeholder="Entrez ici la question" required ng-model="questions[\''+guid+'\'].content" required>',
                        '</div>',
                         '<div class="field" id="answers'+guid+'">',
                            '<div class="ui button tiny positive" ng-click="addAnswer(\''+guid+'\')">Ajouter une réponse</div>',
                        '</div>',
                    '<div class="ui invisible divider"></div>',
                    '</div>'
                ].join('');



                // pre compile for ng-click working in injected html
                $('#questions').append($compile(html)($scope));
                $('#question'+guid).focus();
                $('html, body').animate({
                    scrollTop: $('#addQuestionButton').offset().top
                }, 1000);

            };

            $scope.addAnswer = function(questionGuid) {
                var guid = Utils.guid();
                $scope.questions[questionGuid].answers[guid] = { content: '', status: 0};


                var html = [
                    '<div class="fields" id="'+guid+'">',
                    '<div class="field six wide field" ng-class="{ error: newQcm.$submitted && questions[\''+questionGuid+'\'].answers[\''+guid+'\'].contentError }">',
                    '<label><i class="icon certificate"></i>Réponse</label>',
                    '<input id="answer'+guid+'" placeholder="Saisissez la réponse" type="text"  ng-model="questions[\''+questionGuid+'\'].answers[\''+guid+'\'].content" required>',
                    '</div>',
                    '<div class="field four wide field">',
                    '<label>Valeur</label>',
                    '<div class="ui radio checkbox status'+guid+'">',
                    '<input type="radio" name="value'+guid+'" value="1">',
                    '<label>Bonne réponse</label>',
                    '</div>&nbsp;&nbsp;',
                    '<div class="ui radio checkbox checked status'+guid+'">',
                    '<input type="radio" name="value'+guid+'" value="0" checked="checked">',
                    '<label>Mauvaise réponse</label>',
                    '</div>',
                    '</div>',
                    '<div class="six wide field">',
                    '<div class="ui button negative" ng-click="removeAnswer(\''+questionGuid+'\',\''+guid+'\' );" >Supprimer la réponse</div>',
                    '</div>',
                    '</div>'

                ].join('');

                $('#answers'+questionGuid).append($compile(html)($scope));
                $('.status'+guid)
                    .checkbox('setting', 'onChange' ,function() {
                        $scope.setAnswerStatus(questionGuid, guid, this[0].value);
                    });

                $('#answer'+guid).focus();

                $('html, body').animate({
                    scrollTop: $('#answers'+questionGuid).offset().top
                }, 1000);

            };

            // Process validation qcm
            $scope.submitQcm = function() {
                angular.forEach($scope.questions, function(question) {
                    var answers = question.answers;
                    question.answers = [];
                    delete question.contentError;
                    delete question.noAnswer;
                    angular.forEach(answers, function(answer) {
                        delete answer.contentError;
                        question.answers.push(answer);
                    });
                    $scope.currentQcm.questions.push(question);
                });
                $scope.currentQcm.user_id = SessionService.getUser().id;
                console.info('qcm data', $scope.currentQcm);

                DataAccess.create(ENTITY.qcm, $scope.currentQcm).then( function(data) {
                    $location.path('/admin/dashboard');
                });
            };

            $scope.setAnswerStatus = function(questionGuid, answerGuid, val) {
                $scope.questions[questionGuid].answers[answerGuid].status = parseInt(val);
            };

            $scope.openValidateQcmModal = function() {
                if($scope.newQcm.$valid && $scope.currentQcm.class_level != ''){
                    $scope.formErrors.classlevel = false;
                    var error = false;
                    var noRightAnswer;
                    _.each($scope.questions, function(question, guid) {
                        if(question.content == '') {
                            $scope.questions[guid].contentError = true;
                            error = true;
                        } else {
                            $scope.questions[guid].contentError = false;
                        }
                        noRightAnswer = true;
                        _.each(question.answers, function(answer, answerGuid) {
                            if(answer.content == '') {
                                $scope.questions[guid].answers[answerGuid].contentError = true;
                                error = true;
                            } else {
                                $scope.questions[guid].answers[answerGuid].contentError = false;
                            }
                            if(parseInt(answer.status) == 1) {
                                noRightAnswer = false;
                            }
                        });

                        var nbAnswers =0;
                        _.each(question.answers, function() {
                            nbAnswers ++;
                        });
                        console.log('nbAnswers',nbAnswers);
                        if(noRightAnswer || nbAnswers < 2) {
                            $scope.questions[guid].noAnswer = true;
                            error = true;
                        } else {
                            $scope.questions[guid].noAnswer = false;
                        }
                    });

                    if(error) {
                        $('html, body').animate({
                            scrollTop: $('.error').first().offset().top
                        }, 1000);
                        return;
                    } else {
                        $scope.currentQcm.questions = [];
                        $('#validateQcm').modal('show');

                    }
                } else {
                    if($scope.currentQcm.class_level == '') {
                        $scope.formErrors.classlevel = true;
                    }
                    $('html, body').animate({
                        scrollTop: $('body').offset().top
                    }, 1000);
                }
            };

            $scope.removeAnswer = function(questionGuid , answerGuid) {
                delete $scope.questions[questionGuid].answers[answerGuid];
                $('#'+answerGuid).remove();
            };

        }]);