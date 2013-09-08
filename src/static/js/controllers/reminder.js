
angular.module('app.reminder', [])

.controller('ReminderStandardCreateController', function ($scope, $http, $location, flash) {

	$scope.initForm = function () {
		$scope.showWeeks = false;
		$scope.message = {};

		// TODO: delete
		$scope.message = {
			user: "Dan",
			task: "fix your shit",
			dueDate: "2013-04-01",
			dueTime: "14:03",
			details: "Details, bitch."
		};
	};

	$scope.create = function () {
		createReminder ($scope, $http, $location, flash);
	};
})

.controller('ReminderKnownCreateController', function ($scope, $http, $routeParams, $location, flash) {
	$scope.message = {};

	// TODO: delete
	$scope.message = {
		user: "Dan",
		task: "fix your shit",
		dueDate: "2013-04-01",
		dueTime: "14:03",
		details: "Details, bitch."
	};

	$scope.initForm = function () {
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

		$http.get('/reminder/list')
			.success( function (response) {
				console.log(response);
				$scope.reminderList = response.reminders;
			})
			.error( function (err) {
				console.log(err);
			});
	};
});

var createReminder = function ($scope, $http, $location, flash) {
	// format data
	var data = $scope.message;
	data['due'] = data['dueDate'] + ' ' + data['dueTime'];
	delete data['dueDate'];
	delete data['dueTime'];

	$http.post('/reminder/create', $scope.message)
		.success(function(response){
			flash.notify(response.message);
			$location.url('/');
		})
		.error(function(err, status){
			if (status === 403) {
				flash.alertError(err.message);
			}
			var datetime = data.due.split(' ');
			$scope.message.dueDate = datetime[0];
			$scope.message.dueTime = datetime[1];
		});
};
