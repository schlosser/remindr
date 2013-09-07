
var app = angular.module('app', [
	'app.home',
    'app.login'
]);

app.config( ['$routeProvider', function($routeProvider) {
	$routeProvider

		// ROUTES
        .when('/login', {templateUrl: 'static/partials/login.html',     controller: 'LoginController'})
		.when('/',		{templateUrl: 'static/partials/home.html',		controller: 'HomeController'})

		// default
		.otherwise({redirectTo: '/'});
}]);
