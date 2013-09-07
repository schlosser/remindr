
angular.module('app.signup', [])

.controller('SignupController', function($scope, $http, $location, flash) {
	$scope.user = {};

	$scope.signup = function () {
		var data = $scope.user;
		if (!checkPass(data.password, data.repeatPassword)) {
			flash.alertError('Passwords not matching');
			return;
		}

		$http.post('/signup', $scope.user)
			.success( function (resp) {
				flash.notify(resp.message);
				$location.url('/');
			})
			.error( function (err) {
				flash.alertError(err.message);
			});
	};

	var checkPass = function (pass1, pass2) {
		if (pass1 !== pass2) {
			return false;
		}
		return true;
	};
});
