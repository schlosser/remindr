
angular.module('app.reminder', [])

.controller('ReminderCreateController', function ($scope, $http) {
	$scope.message = {};

	// TODO: delete
	$scope.message = {
		user: "Dan",
		task: "fix your shit",
		dueDate: "2013-04-01",
		dueTime: "14:03",
		details: "Details, bitch."
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
});
