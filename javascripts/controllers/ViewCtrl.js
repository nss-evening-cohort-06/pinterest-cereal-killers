"use strict";

app.controller("ViewCtrl", function($location, $routeParams, $rootScope, $scope, PinService) {
	$scope.pins = [];
	$scope.pinObject = {};

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
			$location.path("/pinterest/viewpinedit");
		}).catch((err) => {
			console.log("error in addNewPin", err);
			
		});
	};

	$scope.submitForm = (newpin) => { 
		 $rootScope.updatedPin = {
			"board": newpin.board,
			"title": newpin.title,
			"url": newpin.url,
			"notes": newpin.notes,
			"datePinned": newpin.datePinned,
			"user_id": "fasdfasdfafas313123xxs",
		};
		$location.path("/pinterest/viewpinedit");
	};
		
		

	
});