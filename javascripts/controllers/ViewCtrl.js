"use strict";

app.controller("ViewCtrl", function($location, $rootScope, $scope, PinService, BoardService) {

	$scope.pins = [];
	$scope.pinObject = {};
	let pinBoardArray = [];

	const getPins = () => {
		PinService.getAllPins($rootScope.uid).then((results) => {
			BoardService.joinBoards(results);

			if(!$rootScope.boardDataFlag) {
				$scope.pins = results;
			} else {
				$rootScope.boardDataFlag = false;
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

	const getSpecificPins = (boardid) => {
		console.log('in getSpecificPins', boardid);
	};
	
	
	$scope.deletePin = (pinId) => {
		PinService.deletePin(pinId).then((results) => {
			getPins();
		}).catch((err) => {
			console.log("error in deletePin", err);
		});
	};


	$scope.submitForm = (newpin) => { 
		 $rootScope.updatedPin = {
			"board": newpin.board,
			"title": newpin.title,
			"url": newpin.url,
			"notes": newpin.notes,
			"datePinned": newpin.datePinned,
			"uid": $rootScope.uid,
		};
		$location.path("/pinterest/viewpinedit");
	};


	$scope.createNewPin = () => {
		$location.path("/pinterest/pinsNew");
	};
		
		
	getPins();
	
});