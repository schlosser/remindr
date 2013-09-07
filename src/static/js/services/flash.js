
angular.module('app.flash', [])

.factory('flash', function ($rootScope) {
    var queue = [],
        currentMessage = '';

    $rootScope.$on('$routeChangeSuccess', function () {
        if (queue.length > 0) {
            currentMessage = queue.shift();
        } else {
            currentMessage = '';
        }
    });

    return {
        // will load on the next page
        notify: function (message) {
            queue.push(message);
        },
        // will load error on next page
        notifyError: function (error) {
            queue.push('ERROR: ' + error);
        },
        // loads on current page
        alert: function (message) {
            currentMessage = message;
        },
        // loads an error on the current page
        alertError: function (error) {
            currentMessage = 'ERROR: ' + error;
        },
        get: function (message) {
            return currentMessage;
        }
    };
});
