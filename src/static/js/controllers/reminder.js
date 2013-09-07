
angular.module('app.reminder', [])

.controller('ReminderStandardCreateController', function ($scope, $http) {

	$scope.initForm = function () {
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

	$scope.createReminder = function() {

		// format data
		var data = $scope.message;
		data['due'] = data['dueDate'] + ' ' + data['dueTime'];
		delete data['dueDate'];
		delete data['dueTime'];

		console.log(data);
		$http.post('/reminder/create', $scope.message)
			.success(function(response){
				console.log("Success:");
				console.log(response);
			})
			.error(function(err){
				console.log("Error:");
				console.log(err);
			});
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

	$scope.createReminder = function () {

		// format data
		var data = $scope.message;
		data['due'] = data['dueDate'] + ' ' + data['dueTime'];
		delete data['dueDate'];
		delete data['dueTime'];

		console.log(data);
		$http.post('/reminder/create', $scope.message)
			.success(function(response){
				console.log("Success:");
				console.log(response);
			})
			.error(function(err){
				console.log("Error:");
				console.log(err);
			});
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
