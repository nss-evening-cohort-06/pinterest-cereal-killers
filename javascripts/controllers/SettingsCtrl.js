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

// 	const getAvatars = () => {
//     		SettingsService.getAvatarsFromFirebase($rootScope.uid).then((results) => {
// 			$scope.avatars = results;
// 			console.log(avatars);
//     	}).catch((err) => {
//     	console.log("error in getAvatars", err);
//    	});
//    };


	$scope.cancelProfile = () => {
		$location.path('/pinterest/view');
	};

});
	
	

