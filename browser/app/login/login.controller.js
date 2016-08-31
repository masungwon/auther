'use strict';

app.controller('LoginCtrl', function ($scope, AuthFactory, $state, $log) {

	$scope.submitLogin = function () {
		AuthFactory.getUser($scope.email, $scope.password)
		.then(function(){
			$state.go('stories');
		})
		.catch($log);
	}
})