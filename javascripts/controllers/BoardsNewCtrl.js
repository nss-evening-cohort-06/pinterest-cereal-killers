'use strict';

app.controller("NewBoardsCtrl", function($location, $rootScope, $scope, PinService) {

	$scope.saveContact = (contact) => {
		contact.uid = $rootScope.uid;
		contact.favorite = false;
		ContactService.postNewContact(contact).then(() => {
			$location.path('/contacts/view');
		}).catch((err) => {
			console.log("error in postNewContact", err);
		});
	};

	$scope.reset = function() {
		for (let key in $scope.contact) {  
	    	$scope.contact[key] = null;
	    }
	    $scope.formNewContact.$setPristine();
	    $scope.formNewContact.$setUntouched();
 	};


 	const editContacts = () => {
 		if ($rootScope.contactToEdit) {
 			$scope.contact = $rootScope.contactToEdit;
 			$rootScope.contactToEdit = null;
 		}
 	};

 	$scope.updateContact = (contact) => {
 		ContactService.putContact(contact).then(() => {
			$location.path('/contacts/view');
			$rootScope.flag = false;
		}).catch((err) => {
			console.log("error in updateContact", err);
		});
 	};

 	editContacts();

 	$scope.degrees = ['Doctorate', 'Masters of Science', 'Masters of Arts', 'Bachelor of Science', 'Bachelor of Arts', 'Associates in Arts'];

});
