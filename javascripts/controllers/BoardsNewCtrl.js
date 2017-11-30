'use strict';

app.controller("NewBoardsCtrl", function($location, $rootScope, $scope, PinService) {

	$scope.saveBoard = (board) => {
		board.uid = $rootScope.uid;
		board.favorite = false;
		PinService.postNewBoard(board).then(() => {
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
 		if ($rootScope.contactToEdit) {
 			$scope.contact = $rootScope.contactToEdit;
 			$rootScope.contactToEdit = null;
 		}
 	};

 	$scope.updateBoard = (contact) => {
 		PinService.putBoard(contact).then(() => {
			$location.path('/partials/pinterest/boards');
			$rootScope.flag = false;
		}).catch((err) => {
			console.log("error in updateContact", err);
		});
 	};

 	editBoard();

 	$scope.degrees = ['Doctorate', 'Masters of Science', 'Masters of Arts', 'Bachelor of Science', 'Bachelor of Arts', 'Associates in Arts'];

});
