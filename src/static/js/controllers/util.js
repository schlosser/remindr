
angular.module('app.util', [])

.controller('SearchController', function ($scope, $http, flash, $location) {
	$scope.selected = undefined;	
	$scope.userList = []

	$scope.initUserList = function () {
		$http.get('/user/list')
			.success( function (response) {
				$scope.userList = response.users;
			})
			.error( function(err) {
				flash.alertError(err.message);
			});
	};

	$scope.openReminder = function () {
		var uid = null;

		for (var index in $scope.userList) {
			if ($scope.userList[index].username == $scope.selected) {
				uid = $scope.userList[index]._id
			}
		}
		if (uid) {
			$location.url('\/create\/'+uid);
		} else {
			$location.url('/');
		}
	};
})

.controller('Flash', function ($scope, flash) {
	$scope.flash = flash;
	$scope.dismissed = false;
})


.controller('Session', function($scope, $cookieStore, $rootScope, $http, flash, $location, $route, $window) {

	$scope.session = {};

	$http.get('/session')
		.success( function (response) {
			$cookieStore.put('username',	response.username);
			$cookieStore.put('email',		response.email);
			$cookieStore.put('id',			response.id);

			$scope.session.username	= $cookieStore.get('username') || null;
			$scope.session.email	= $cookieStore.get('email') || null;
			$scope.session.id		= $cookieStore.get('id') || null;
		});

	$rootScope.$on('$routeChangeSuccess', function() {
		$scope.session.username	= $cookieStore.get('username') || null;
		$scope.session.email	= $cookieStore.get('email') || null;
		$scope.session.id		= $cookieStore.get('id') || null;
	});

	//$scope.session.update 

	$scope.session.logout = function () {
		$http.post('/logout')
			.success( function (data) {
				$cookieStore.remove('username');
				$cookieStore.remove('email');
				$cookieStore.remove('id');
				$window.location.href = '/#/';
				$route.reload();
			})
			.error( function (err) {
				flash.alertError(err);
			});
	};

	$scope.session.signin = function() {
		var signinData = {
			email	: $scope.session.email,
			password: $scope.session.password
		};

		$http.post('/login', signinData)
			.success( function (response) {
				// delete credentials
				delete $scope.session.email;
				delete $scope.session.password;

				$cookieStore.put('username',	response.username);
				$cookieStore.put('email',		response.email);
				$cookieStore.put('id',			response.id);

				$scope.session.username	= $cookieStore.get('username') || null;
				$scope.session.email	= $cookieStore.get('email') || null;
				$scope.session.id		= $cookieStore.get('id') || null;

				if ($location.url() == '/') {
					flash.alert('signed in');
					return;
				}
				flash.notify("signed in");
				//$location.url('/');
				$window.location.href = '/#/';
				$route.reload();
			})
			.error( function (err) {
				console.log(err);
				flash.alertError("invalid signin");
			});
	};
})

.controller('LogoutController', function($scope) {

});
