angular.module('app.configure', [])

.controller('ConfigureController', function($scope, $http, $location, flash) {
    $scope.forwarders = {};
    $scope.dropbox = {};

    $http.get('/forwarders')
        .success( function(resp) {
            $scope.forwarders = resp;
            console.log(resp);
        })
        .error( function (err) {
            flash.alertError(err.message);
        });

    $scope.update = function() {
        $scope.forwarders.forwarders.dropbox.fileUrl = $scope.dropbox.files[0][0]['link'];
        $scope.forwarders.forwarders.dropbox.fileSize = $scope.dropbox.files[0][0]['bytes'];
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