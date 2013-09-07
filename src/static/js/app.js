
var app = angular.module('app', [
	'app.home'
]);

app.config( ['$routeProvider', function($routeProvider) {
	$routeProvider

		// ROUTES
		.when('/',		{templateUrl: 'static/partials/home.html',		controller: 'HomeController'})

		// default
		.otherwise({redirectTo: '/'});
}]);
