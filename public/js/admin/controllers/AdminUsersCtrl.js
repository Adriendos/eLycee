app.controller('AdminUsersCtrl', ['$scope','DataAccess', 'ENTITY', function($scope, DataAccess, ENTITY) {

    $scope.firstClassStudents;
    $scope.finalClassStudents;
    $scope.currentStudent;
    $('.ui.dropdown').dropdown({
        action: 'nothing'
    });
    var allStudents;
    init();
    function init() {
        DataAccess.getAllData(ENTITY.user).then(
            function(users) {
                allStudents = _.filter(users, function(user) {
                    return user.role != 'teacher';
                });

                $scope.firstClassStudents = _.filter(allStudents, function(student) {
                    return student.role == 'first_class';
                });

                $scope.finalClassStudents = _.filter(allStudents, function(student) {
                    return student.role == 'final_class';
                });
            }
        );
    }

    $scope.deleteStudent = function() {
        DataAccess.delete(ENTITY.user, $scope.currentStudent.id).then(function() {
            init();
        });
    };

    $scope.openDeleteStudentModal = function(student) {
        $scope.currentStudent = student;
        $('#deleteStudentModal').modal('show');
    };
}]);