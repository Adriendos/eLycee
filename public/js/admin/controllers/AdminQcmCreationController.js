app.controller('AdminQcmCreationCtrl',
    ['$scope', '$compile', 'Utils',
        function($scope, $compile, Utils) {
            $scope.question = {};
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
                var html = [
                    '<div class="ui segment">',
                        '<div class="ui top attached label small left blue"><i class="icon question"></i>Question:</div>',
                        '<div class="ui top attached label small right remove-question" ng-click="removeQuestion($event);">',
                            '<i class="icon close"></i> &nbsp;Supprimer cette question',
                        '</div>',
                        '<div class="field">',
                            '<label>Question</label>',
                            '<input type="text" placeholder="Entrez ici la question" required>',
                        '</div>',
                        '<div class="fields" id="answers">',
                            '<div class="ui divider invisible"></div>',
                            '<div class="ui button tiny positive" ng-click="addAnswer()">Ajouter une réponse</div>',
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

            $scope.addAnswer = function() {
                var html = [
                    '<div class="two fields">',
                        '<div class="field">',
                            '<label>Réponse</label>',
                            '<input placeholder="Saisissez la réponse" type="text">',
                        '</div>',
                        '<div class="field">',
                            '<label>Valeur</label>',
                            '<div class="ui radio checkbox">',
                            '<input type="radio" name="value" checked="">',
                            '<label>Bonne réponse</label>',
                        '</div>&nbsp;&nbsp;',
                        '<div class="ui radio checkbox">',
                            '<input type="radio" name="value" checked="">',
                            '<label>Mauvaise réponse</label>',
                        '</div>',
                    '</div>'
                ].join('');

                $('#answers').append($compile(html)($scope));
            };

            $scope.submitQcm = function() {
                console.log('form submitted');
            };

        }]);