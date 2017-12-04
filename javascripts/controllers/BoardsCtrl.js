"use strict";


app.controller("BoardsCtrl", function($location, $rootScope, $scope, BoardService) {

	const getMyBoards = () => {	
		BoardService.getBoards($rootScope.uid).then((results) => {
			$scope.boards = results;
		}).catch((err) => {
			console.log("error in getMyBoards", err);
		});
	};

	$scope.boardDelete = (boardId) => { 
		BoardService.deleteBoard(boardId).then((results) => {
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

  	$scope.boardDetail = (boardData) => { 
    	$rootScope.boardData = boardData;
    	$rootScope.boardDataFlag = true;
    	$location.path(`/pinterest/boardView`);
  	};

	$scope.boardCreate = () => { 
    	$rootScope.boardEditFlag = false;
    	$location.path(`/pinterest/createNewBoard`);
  	};

	getMyBoards();

});