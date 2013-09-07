
var app = angular.module('app', [
	'ngCookies',
	'app.header',
	'app.home',
	'app.util',
	'app.flash',
	'app.signup',
	'app.reminder',
    'app.configure'
]);

app.config( ['$routeProvider', function($routeProvider) {
	$routeProvider

	// ROUTES
	.when('/loggedout', {templateUrl: 'static/partials/logout.html', controller: 'LogoutController'})
	.when('/create/:id',	{templateUrl: 'static/partials/reminder/create.html', controller: 'ReminderKnownCreateController'})
	.when('/create',	{templateUrl: 'static/partials/reminder/create.html',	controller: 'ReminderStandardCreateController'})
	.when('/login',		{templateUrl: 'static/partials/login.html'})
	.when('/signup',	{templateUrl: 'static/partials/signup.html',	controller: 'SignupController'})
    .when('/configure', {templateUrl: 'static/partials/configure.html', controller: 'ConfigureController'})
	.when('/',			{templateUrl: 'static/partials/home.html',		controller: 'HomeController'})

	// default
	.otherwise({redirectTo: '/'});
}]);
