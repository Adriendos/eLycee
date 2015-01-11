app.controller('AdminStudentsCtrl', ['$scope','DataAccess', 'ENTITY', function($scope, DataAccess, ENTITY) {

    $scope.firstClassStudents;
    $scope.finalClassStudents;

    var allStudents;

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

            console.log($scope.firstClassStudents);
            console.log($scope.finalClassStudents);
        }
    );


}]);