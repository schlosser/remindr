
angular.module('app.home', [])

.controller('HomeController', function ($scope, $http) {
	$scope.message = {
		name: "Dan",
		task: "fix your shit",
		date: "2013-04-01",
		time: "14:03",
		details: "Details, bitch."
	};
	$scope.createReminder = function() {
		console.log($scope.message);
		$http.post('/reminder/create', $scope.message)
			.success(function(response){
				console.log("Success:");
				console.log(response);
			})
			.error(function(err){
				console.log("Error:");
				console.log(err);
			});
	}
});


