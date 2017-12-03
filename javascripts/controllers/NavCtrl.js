"use strict";

app.controller("NavCtrl", function($scope, $location) {
	$scope.controller = "NavCtrl";

	$scope.editUser = (userId) => {
		$location.path(`/pinterest/settingsedit/${userId}`);
	};
});