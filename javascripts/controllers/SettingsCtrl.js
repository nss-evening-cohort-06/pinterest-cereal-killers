"use strict";

app.controller("SettingsCtrl", function($scope, $location, $rootScope, SettingsSevice){
	$scope.newProfileSaved = {};

	// $scope.getNewAvatar = ()=> {
		//**Gina
	// };

	$scope.saveProfileButton = ()=> {
		let newProfilesaved = {
			"uid": $rootScope.uid,
			"firstName": $scope.newProfileSaved.firstName,
			"lastName": $scope.newProfiledSaved.lastName,
			"bio": $scope.newProfileSaved.bio
		};
		//Juno did not create SettingService yet
		 SettingsService.addUpdatedProfile(newProfileSaved).then(() => {
		 $location.path('/settings');
		    }).catch((err) => {
			console.log("err in addNewContact", err);
		    });
	
	};
	


	$scope.cancelProfile = () => {
		$location.path('/view');
	};






});