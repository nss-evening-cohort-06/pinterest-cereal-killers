"use strict";

app.controller("NavCtrl", function($rootScope, $scope, $location, $window, AuthService) {
	$scope.controller = "NavCtrl";

	$scope.editUser = (userToEdit) => {
		$rootScope.userToEdit = userToEdit;
		$location.path(`/pinterest/settingsedit/${userToEdit.id}`);
	};


	$scope.logoutUser = () => {
		delete $rootScope.uid;
		$window.localStorage.clear();
		AuthService.logout();
		$location.path('/login');
	};

});