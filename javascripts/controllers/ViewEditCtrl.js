"use strict";

app.controller("ViewEditCtrl", function($location, $rootScope, $routeParams, $scope, PinService) {
$scope.newpin = {};

	const getPins = () => {
		PinService.getSinglePin($routeParams.id).then((results) => { 
			$scope.pins = results.data;
		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};

	$scope.niceNewPin = () => { 
		console.log("Heyyyyy");
		let newpin = {};
		
		newpin.board_id = $rootScope.updatedPin.board_id;
		newpin.title = $rootScope.updatedPin.title;
		newpin.url = $rootScope.updatedPin.url;
		newpin.notes = $rootScope.updatedPin.notes;
		newpin.datePinned = $rootScope.updatedPin.datePinned;
		newpin.uid = $rootScope.uid;
		console.log("thenewpin", newpin);
		console.log("PINID", $rootScope.pinId);
		PinService.updatePin(newpin, $rootScope.pinId).then((results) => {
			console.log("GARBAGE RESULTS", results);
			$scope.pinDetail();
		}).catch((err) => {
			console.log("error in garbageFunction", err);
		});
	};

	$scope.pinDetail = (newPin) => {
		$location.path("/pinterest/boards");
	};
	
	
	getPins();

});