"use strict";

app.controller("NewPinCtrl", function($http, $location, $rootScope, $scope, PinService) {
	$scope.newcontact = {};

$scope.submitForm = (newpin) => { 
		 $rootScope.updatedPin = {
			"board": newpin.board,
			"title": newpin.title,
			"url": newpin.url,
			"notes": newpin.notes,
			"datePinned": newpin.datePinned,
			"uid": "fasdfasdfafas313123xxs",
		};
	};

		$scope.postNewPin = (newpin) => {
	
		PinService.addNewPin(newpin).then((results) => {
			$location.path("/pinterest/view");
			console.log(newpin);
		}).catch((err) => {
			console.log("error in postNewPin", err);
			
		});
	};

		// $scope.updatePins = (newpin) => {
 	// 	PinService.updatePins(newpin).then(() => {
		// 	$location.path('/pinterest/view');
		// }).catch((err) => {
		// 	console.log("error in updateContact", err);
		// });
 	// };
		

});