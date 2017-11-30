"use strict";

app.controller("ViewEditCtrl", function($location, $rootScope, $routeParams, $scope, PinService) {


	const getPins = () => {
		PinService.getSinglePin($routeParams.id).then((results) => {
			$scope.pins = results.data;
		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};


	$scope.savePin = (newPin) => {
		PinService.updatePin(newPin, $routeParams.id).then((results) => {
			$location.path("/contacts/view");
		}).catch((err) => {
			console.log("error in submitForm", err);
		});
	};

	getPins();
});