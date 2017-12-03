"use strict";

app.controller("ViewCtrl", function($location, $rootScope, $scope, PinService, BoardService) {

	$scope.pins = [];
	$scope.pinObject = {};
	let pinBoardArray = [];

	const getPins = () => {
		PinService.getAllPins("fasdfasdfafas313123xxs").then((results) => {
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
			// let Pins = BoardService.joinBoards(results);
			// console.log('in getPins - $scope.pins',$scope.pins);
			// console.log('in getPins - Pins',Pins);
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
		
		
	getPins();
	
});