"use strict";

app.controller("ViewCtrl", function($rootScope, $scope, PinService) {
	$scope.pins = [];

	const getPins = () => {
		PinService.getAllPins("fasdfasdfafas313123xxs").then((results) => {
			$scope.pins = results;
			console.log(results);
		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};
	getPins();
});