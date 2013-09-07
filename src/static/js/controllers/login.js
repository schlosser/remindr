
angular.module('app.login', [])

.controller('LoginController', function ($scope) {
    $scope.user = {};

    $scope.login = function () {
        console.log($scope.user);
    };
});
