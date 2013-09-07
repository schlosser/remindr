
angular.module('app.signup', [])

.controller('SignupController', function($scope, $http, $location) {
  $scope.user = {};

  $scope.signup = function () {
    console.log($scope.user);

    $http.post('/signup', $scope.user)
      .success( function (resp) {
        console.log('Sign up success');
        console.log(resp);
        $location.url('/');
      })
      .error( function (err) {
        console.error('Sign up ERROR');
        console.error(err);
      });
  };
});