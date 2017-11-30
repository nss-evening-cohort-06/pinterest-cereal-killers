"use strict";

app.controller("ViewCtrl", function($location, $rootScope, $scope, PinService) {
	$scope.pins = [];
	$scope.newPin = {};

	const getPins = () => {
		PinService.getAllPins("fasdfasdfafas313123xxs").then((results) => {
			$scope.pins = results;
			console.log(results);
		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};
	getPins();


	$scope.deletePin = (pinId) => {
		PinService.deletePin(pinId).then((results) => {
			getPins();
		}).catch((err) => {
			console.log("error in deletePin", err);
		});
	};

		
	$scope.createNewPin = (newPin) => {
		PinService.addNewPin(newPin).then((results) => {
			$location.path("/contacts/view");
		}).catch((err) => {
			console.log("error in addNewPin", err);
			
		});
	};

	$scope.savePin = (pinId) => {
	$location.path(`/pinterest/viewpinedit/${pinId}`);
};

});