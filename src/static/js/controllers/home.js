
angular.module('app.home', [])

.controller('HomeController', function ($scope) {
    $scope.message.targetUser = "";
    $scope.message.subject = "";
    $scope.message.time = "";
    $scope.message.date = "";
    $scope.message.body = "";


});


