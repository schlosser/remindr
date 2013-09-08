
angular.module('app.home', [])

.controller('HomeController', function ($scope, $http, $route, flash) {
	$scope.archiveRemindr = function (_id) {
		$http.post('/reminder/complete/'+_id)
			.success( function(resp) {
				flash.notify(resp.message);
			})
			.error( function(err) {
				flash.alertError(err.message);
			});
		$route.reload();
	};
});