"use strict";

app.controller("ViewCtrl", function($location, $rootScope, $scope, PinService, BoardService) {

	$rootScope.boardDataFlag = false;
	$scope.pins = [];
	$scope.pinObject = {};
	let pinBoardArray = [];

	const getPins = () => {
		PinService.getAllPins($rootScope.uid).then((results) => {
			BoardService.joinBoards(results);

			if(!$rootScope.boardDataFlag) {
				$scope.pins = results;
			} else {
				pinBoardArray = results;
				let temp = pinBoardArray.filter(function(pin) {
					return $rootScope.boardData.boardId === pin.board_id;
				});
				$scope.pins = temp;
			}

		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};
	getPins();


	$scope.submitForm = (newpin) => { 
		 $rootScope.updatedPin = {
			"board_id": newpin.board_id,
			"title": newpin.title,
			"url": newpin.url,
			"notes": newpin.notes,
			"datePinned": newpin.datePinned,
			"uid": $rootScope.uid,

		};
		$rootScope.pinId = newpin.id;
		$location.path("/pinterest/viewpinedit");
	};


	$scope.createNewPin = () => {
		$location.path("/pinterest/pinsNew");
	};
		
		

	
});