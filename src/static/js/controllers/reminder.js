
angular.module('app.reminder', [])

.controller('ReminderStandardCreateController', function ($scope, $http, $location, flash) {

	$scope.initForm = function () {
		$scope.showWeeks = false;
		$scope.message = {};
	};

	$scope.create = function () {
		createReminder ($scope, $http, $location, flash);
	};
})

.controller('ReminderKnownCreateController', function ($scope, $http, $routeParams, $location, flash) {
	$scope.message = {};

	$scope.initForm = function () {
		if (!$scope.session.username) {
			return;
		}

		$http.get('/user/'+$routeParams.id)
			.success( function (response) {
				$scope.message.user = response.username;
			})
			.error( function (err) {
				flash.notifyError(err.message);
				$location.url('/');
			});
	};

	$scope.create = function () {
		createReminder ($scope, $http, $location, flash);
	};
})

.controller('ReminderListController', function ($scope, $http, flash) {

	$scope.initList = function () {
		$scope.reminderList = [];

		if ($scope.session && $scope.session.username) {
			$http.get('/reminder/list')
				.success( function (response) {
					console.log(response);
					$scope.reminderList = response.reminders;
				})
				.error( function (err) {
					console.log(err);
				});
		}
	};
});

var createReminder = function ($scope, $http, $location, flash) {
	// format data
	var data = $scope.message;
	console.log(data);

	$http.post('/reminder/create', data)
		.success(function(response){
			flash.notify(response.message);
			$location.url('/');
		})
		.error(function(err, status){
			if (status === 403) {
				flash.alertError(err.message);
			}
		});
};
