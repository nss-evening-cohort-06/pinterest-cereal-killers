"use strict";

app.controller("NewPinCtrl", function($http, $location, $rootScope, $routeParams, $scope, PinService, BoardService) {
	$scope.newpin = {};

$scope.newPinObject = (newpin) => { 
		 $rootScope.updatedPin = {
			"board_id": newpin.board,
			"title": newpin.title,
			"url": newpin.url,
			"notes": newpin.notes,
			"datePinned": newpin.datePinned,
			"uid": $rootScope.uid,
		};
		return $rootScope.updatedPin;
};

		$scope.postNewPin = (updatedPin) => {
			let boardObject = {
				"name": updatedPin.board,
				"uid": $rootScope.uid
			};
			BoardService.createNewBoard(boardObject).then((results) => {
				let newPin = $scope.newPinObject(updatedPin);
				newPin.board_id = results.data.name;
				PinService.addNewPin(newPin).then((results) => {
					$location.path("/pinterest/view");
					console.log(updatedPin);
				}).catch((err) => {
					console.log("error in postNewPin", err);
					
				});
			}).catch((err) => {
				console.log("error in postNewPin2", err);
			});

	};


	

});