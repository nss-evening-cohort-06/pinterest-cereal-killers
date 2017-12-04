"use strict";

app.controller("NavCtrl", function($rootScope, $scope, $location) {
	$scope.controller = "NavCtrl";

	$scope.editUser = (userToEdit) => {
		$rootScope.userToEdit = userToEdit;
		$location.path(`/pinterest/settingsedit/${userToEdit.id}`);
	};
});