
var app = angular.module('app', [
	'app.header',
	'app.home',
	'app.login',
	'app.util',
	'app.flash',
	'app.signup',
	'app.reminder'
]);

app.config( ['$routeProvider', function($routeProvider) {
	$routeProvider

	// ROUTES
	.when('/create',	{templateUrl: 'static/partials/create.html',	controller: 'ReminderCreateController'})
	.when('/login',		{templateUrl: 'static/partials/login.html',		controller: 'LoginController'})
	.when('/signup',	{templateUrl: 'static/partials/signup.html',	controller: 'SignupController'})
	.when('/',			{templateUrl: 'static/partials/home.html',		controller: 'HomeController'})

	// default
	.otherwise({redirectTo: '/'});
}]);
