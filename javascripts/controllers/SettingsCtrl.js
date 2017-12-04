"use strict";

app.controller("SettingsCtrl", function($rootScope, $http, $location, $q, $scope, $window, FIREBASE_CONFIG, SettingsService) {
	
	$scope.addNewUserToFirebase = () => {
		$scope.newUser.uid = $rootScope.uid;
		SettingsService.postNewUser($scope.newUser).then((results) => {
			$scope.newUser = {};
			$window.alert("User information saved.");
			$location.url("/pinterest/settings");
		}).catch((error) => {
			console.log("error in addNewUserToFirebase", error);
		});
	};

	$scope.createNewAvatar = () => {
		$scope.newAvatar.uid = $rootScope.uid;
		SettingsService.addNewAvatar($scope.newAvatar).then((results) => {
			$scope.newAvatar = {};
				$location.url("/pinterest/settings");
		}).catch((error) => {
			console.log("error in addNewAvatar", error);
		});
	};

$scope.avatars = [
	{
		"avatarId": 0,
		"avatar_url": "./images/Rudolph.png",
		"name": "Rudolph"
	},
	{
		"avatarId": 1,
		"avatar_url": "./images/Dancer.png",
		"name": "Dancer"
	},
	{
		"avatarId": 2,
		"avatar_url": "./images/Prancer.png",
		"name": "Prancer"
	},
	{
		"avatarId": 3,
		"avatar_url": "./images/Vixen.png",
		"name": "Vixen"
	}
];

	$scope.cancelProfile = () => {
		$location.path('/pinterest/view');
	};

});
	
	

