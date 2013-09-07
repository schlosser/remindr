angular.module('app.header', [])

.controller('HeaderController', function ($scope) {
	$scope.toggleDropdown = function() {
		console.log("here");
		angular.element(document.getElementById('navbar')).toggleClass("collapse");
	}

	$scope.menu = [
	{
		"name":"Sign Up", 
		"link": "#/signup"
	},
	{
		"name":"Sign In", 
		"link": "#/login"
	},
	{
		"name":"Sign Out", 
		"link": "#/logout"
	}];

});