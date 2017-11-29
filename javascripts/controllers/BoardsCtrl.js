"use strict";


app.controller("BoardsCtrl", function($location, $rootScope, $scope, PinService) {

	const getMyBoards = () => {	
		// PinService.getBoards($rootScope.uid).then((results) => {
		PinService.getBoards('fasdfasdfafas313123xxs').then((results) => {
			console.log('getMyBoards', results);
			$scope.boards = results;
		}).catch((err) => {
			console.log("error in getMyBoards", err);
		});
	};

	$scope.boardDelete = (boardId) => { console.log("in deleteBoard", boardId);
		PinService.deleteBoard(boardId).then((results) => {
			getMyBoards();
		}).catch((err) => {
			console.log("error in deleteMyBoards", err);
		});
	};

	$scope.boardEdit = (boardToEdit) => {
    	$rootScope.boardToEdit = boardToEdit;
    	$rootScope.boardEditFlag = true;
    	$location.path(`/pinterest/editBoard/${boardToEdit.id}`);
  	};

	getMyBoards();

});