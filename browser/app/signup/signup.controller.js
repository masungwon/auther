'use strict';

app.controller('SignupCtrl', function ($scope, AuthFactory, $state, $log) {
	$scope.signUp = function () {
		AuthFactory.createUser($scope.email, $scope.password)
		.then(function () {
			$state.go('stories');
		})
		.catch($log);
	}
})