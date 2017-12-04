
"use strict";

app.controller("LoginCtrl", function($location, $rootScope, $scope, AuthService) {
	$scope.authenticate = () => {
		AuthService.authenticateGoogle().then((result) => {
			$rootScope.uid = result.user.uid;
			console.log("HI", $rootScope.uid);
			$scope.$apply(() => {
				$location.url("/pinterest/view");
			});
		}).catch((err) => {
			console.log("error in authenticateGoogle", err);
		});
	};
});