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

	const garbageFunction = () => { 
		let newpin = {};
		
		$scope.newpin.board = $rootScope.updatedPin.board;
		$scope.newpin.title = $rootScope.updatedPin.title;
		$scope.newpin.url = $rootScope.updatedPin.url;
		$scope.newpin.notes = $rootScope.updatedPin.notes;
		$scope.newpin.datePinned = $rootScope.updatedPin.datePinned;

	};

	$scope.pinDetail = (newPin) => {
		$location.path("/pinterest/boards");
	};
	
	
	getPins();

		garbageFunction();

});