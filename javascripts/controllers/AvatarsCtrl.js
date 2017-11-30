"use strict";

app.controller("AvatarsCtrl", function($rootScope, $http, $location, $q, $scope, FIREBASE_CONFIG, PinService) {
        $scope.createNewAvatar = () => {
            $scope.newAvatar.uid = $rootScope.uid;
            PinService.addNewAvatar($scope.newAvatar).then((results) => {
                $scope.newAvatar = {};
                    $location.url("/pinterest/settings");
            }).catch((error) => {
                console.log("error in addNewAvatar", error);
            });
        };
    });