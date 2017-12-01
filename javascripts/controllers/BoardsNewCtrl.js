'use strict';

app.controller("BoardsNewCtrl", function($location, $rootScope, $scope, BoardService) {

	$scope.saveBoard = (board) => {
		board.uid = $rootScope.uid;
		board.counter = 0;
		BoardService.createNewBoard(board).then(() => {
			$location.path('/partials/pinterest/boards');
		}).catch((err) => {
			console.log("error in postNewBoard", err);
		});
	};

	$scope.reset = function() {
		for (let key in $scope.contact) {  
	    	$scope.contact[key] = null;
	    }
	    $scope.formNewContact.$setPristine();
	    $scope.formNewContact.$setUntouched();
 	};


 	const editBoard = () => {
 		if ($rootScope.boardToEdit) {
 			$scope.board = $rootScope.boardToEdit;
 			$rootScope.boardToEdit = null;
 		}
 	};

 	$scope.updateBoard = (contact) => {
 		BoardService.putBoard(contact).then(() => {
			$location.path('/pinterest/boards');
			$rootScope.flag = false;
		}).catch((err) => {
			console.log("error in updateContact", err);
		});
 	};

 	editBoard();


});
