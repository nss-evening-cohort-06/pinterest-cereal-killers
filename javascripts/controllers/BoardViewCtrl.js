"use strict";

app.controller("BoardViewCtrl", function($location, $rootScope, $scope, PinService, BoardService) {
	$rootScope.boardDataFlag = true;
	$scope.pins = [];
	$scope.pinObject = {};
	let pinBoardArray = [];

	const getPins = () => {
		PinService.getAllPins($rootScope.uid).then((results) => {
			BoardService.joinBoards(results);

			if(!$rootScope.boardDataFlag) {
				$scope.pins = results;
			} else {
				console.log("BOARD", $rootScope.boardData.id);
				pinBoardArray = results;
				let temp = pinBoardArray.filter(function(pin) {
					return $rootScope.boardData.id === pin.board_id;
				});
				$scope.pins = temp;
			}

		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};
	getPins();



	$scope.deleteOnePin = (pinId) => { 
		PinService.deletePin(pinId).then((results) => {
			getPins();
		}).catch((err) => {
			console.log("error in deleteOnePin", err);
		});
	};


	const getSpecificPins = (boardid) => {
		console.log('in getSpecificPins', boardid);
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
		
		

	
});