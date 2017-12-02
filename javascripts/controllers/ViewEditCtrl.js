"use strict";

app.controller("ViewEditCtrl", function($location, $rootScope, $routeParams, $scope, PinService) {


	const getPins = () => {
		PinService.getSinglePin($routeParams.id).then((results) => { 
			$scope.pins = results.data;
		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};

$scope.newpin = {};


	const garbageFunction = () => { 
		let newpin = {};
		
		$scope.newpin.board = $rootScope.updatedPin.board;
		$scope.newpin.title = $rootScope.updatedPin.title;
		$scope.newpin.url = $rootScope.updatedPin.url;
		$scope.newpin.notes = $rootScope.updatedPin.notes;
		$scope.newpin.datePinned = $rootScope.updatedPin.datePinned;

	};
		
/*		PinService.updatePin(newpin, $routeParams.id).then((results) => {
			$location.path("/pinterest/boards");
		}).catch((err) => {
			console.log("error in submitForm", err);
		});
	
	getPins();
};
*/
garbageFunction();

});