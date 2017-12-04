"use strict";

app.controller("SettingsEditCtrl", function($location, $routeParams, $scope, $rootScope, SettingsService){
    $scope.user = [];
    const getUser = () => {
        SettingsService.getSingleUser($routeParams.id).then((results) =>{
            $scope.user = results.data;
            }).catch((err) =>{
            console.log("err in getSingleUser", err);
        });
    };
    getUser();

    $scope.updateUserInFirebase = (user) => {
		SettingsService.updateUser($routeParams.id, user).then(() => {
            $location.path("/pinterest/settings");
        }).catch((err) => {
            console.log("error in updateUserInFirebase", err);
        });
    };
});