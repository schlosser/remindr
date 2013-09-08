
angular.module('app.reminder', [])

.controller('ReminderStandardCreateController', function ($scope, $http, $location, flash, $filter) {

	$scope.initForm = function () {
		$scope.userList = [];
		getUserList($scope, $http);		// get list of users
		$scope.showWeeks = false;

		// initialize stuff
		$scope.message = {};
		$scope.message.user = undefined;

		$http.get('/reminder/defaults')
			.success( function (response) {
				$scope.message.dueDate = response.date_str;
				$scope.message.dueTime = response.time_str;
			})
			.error( function (err) {
				console.log(err);
			});
	};

	$scope.create = function () {
		createReminder ($scope, $http, $location, flash, $filter);
	};
})

.controller('ReminderKnownCreateController', function ($scope, $http, $routeParams, $location, flash, $filter) {
	$scope.message = {};

	$scope.initForm = function () {
		$http.get('/user/'+$routeParams.id)
			.success( function (response) {
				$scope.message.user = response.username;
			})
			.error( function (err) {
				flash.notifyError(err.message);
				$location.url('/');
			});
		$scope.userList = [];
		getUserList($scope, $http);

		// initialize stuff
		$http.get('/reminder/defaults')
			.success( function (response) {
				$scope.message.dueDate = response.date_str;
				$scope.message.dueTime = response.time_str;
			})
			.error( function (err) {
				console.log(err);
			});
	};

	$scope.create = function () {
		createReminder ($scope, $http, $location, flash, $filter);
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


var getUserList = function ($scope, $http) {
		$http.get('/user/list')
			.success( function (response) {
				$scope.userList = response.users;
				console.log(response);
			})
			.error( function(err) {
				flash.alertError(err.message);
			});
};


var createReminder = function ($scope, $http, $location, flash, $filter) {
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
