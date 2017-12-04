"use strict";

app.controller("NewPinCtrl", function($http, $location, $rootScope, $scope, PinService, BoardService) {
	$scope.newpin = {};

$scope.newPinObject = (newpin) => { 
		 $rootScope.updatedPin = {
			"board": newpin.board,
			"title": newpin.title,
			"url": newpin.url,
			"notes": newpin.notes,
			"datePinned": newpin.datePinned,
			"uid": "fasdfasdfafas313123xxs",
		};
	};

		$scope.postNewPin = (updatedPin) => {
		PinService.addNewPin(updatedPin).then((results) => {
			$location.path("/pinterest/view");
			console.log(updatedPin);
		}).catch((err) => {
			console.log("error in postNewPin", err);
			
		});
	};


		

});