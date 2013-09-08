
angular.module('app.flash', [])

.factory('flash', function ($rootScope) {
	var queue = [],
		currentMessage = {},
		SUCCESS = 'alert alert-success',
		WARNING = 'alert alert-warning',
		ERROR = 'alert alert-danger';		// DANGER ZONE http://youtu.be/RRU3I_o1vLc?t=45s

	$rootScope.$on('$routeChangeSuccess', function () {
		if (queue.length > 0) {
			currentMessage = queue.shift();
		} else {
			currentMessage = {};
		}
	});

	return {
		// will load on the next page
		notify: function (message) {
			queue.push({
				'message'	: message,
				'style'		: SUCCESS
			});
		},
		// will load error on next page
		notifyError: function (error) {
			queue.push({
				'message'	: 'ERROR: ' + error,
				'style'		: ERROR
			});
		},
		// loads on current page
		alert: function (message) {
			currentMessage = {
				'message'	: message,
				'sytyle'	: SUCCESS
			};
		},
		// loads an error on the current page
		alertError: function (error) {
			currentMessage = {
				'message'	: 'ERROR: ' + error,
				'style'		: ERROR
			};
		},
		get: function () {
			return currentMessage;
		}
	};
});
