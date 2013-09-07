
var app = angular.module('app', [
	'app.home',
	'app.login',
	'app.util',
	'app.flash',
	'app.signup'
]);

app.config( ['$routeProvider', function($routeProvider) {
	$routeProvider

	// ROUTES
	.when('/login',		{templateUrl: 'static/partials/login.html',		controller: 'LoginController'})
	.when('/signup',	{templateUrl: 'static/partials/signup.html',	controller: 'SignupController'})
	.when('/',			{templateUrl: 'static/partials/home.html',		controller: 'HomeController'})

	// default
	.otherwise({redirectTo: '/'});
}]);
