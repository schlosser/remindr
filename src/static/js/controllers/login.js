
angular.module('app.login', [])

.controller('LoginController', function ($scope, $http) {
    $scope.user = {};

    $scope.login = function () {
        console.log($scope.user);

        $http.post('/login', $scope.user)
            .success( function (resp) {
                console.log('success');
                console.log(resp);
            })
            .error( function (err) {
                console.log('ERROR');
                console.log(err);
            });

    };
});
