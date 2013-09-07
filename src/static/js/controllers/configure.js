angular.module('app.configure', [])

.controller('ConfigureController', function($scope, $http, $location, flash) {
    $scope.forwarders = {};

    $scope.initForm = function(){
        $http.get('/forwarders')
            .success( function(resp) {
                $scope.forwarders = resp;
            })
            .error( function (err) {
                flash.alertError(err.message);
            })
    };

    $scope.update = function() {
        console.log($scope.forwarders);
        $http.post('/forwarders/update', $scope.forwarders)
            .success( function (resp) {
                flash.notify(resp.message);
                $location.url('/')
            })
            .error( function (err) {
                flash.alertError(err.message);
            });
    };

    $scope.showForwarderOptions = function(name) {
        return $scope.forwarders.current == name;
    }
});