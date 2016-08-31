'use strict';

app.factory('AuthFactory', function($http){

	var returnObj = {};

	returnObj.currUser = null;

	$http({
		method: 'GET',
		url: '/api/auth/me'
	})
	.then(function (user) {
		if (!user) { console.log("currUser is null"); }
		console.log("currUser", user);
		returnObj.currUser = user;
	})

	returnObj.getUser = function(email, password){
		
		return $http({
			method: 'POST',
			url: 'api/login',
			data: {
				email: email,
				password: password
			}
		})
		.then(function (user) {
			returnObj.currUser = user.data;
		})
	}

	returnObj.createUser = function(email, password){
		return $http({
			method: 'POST',
			url: '/api/users',
			data: {
				email: email,
				password: password
			}
		})
		.then(function (user) {
			returnObj.currUser = user.data;
		})
	}

	returnObj.logout = function() {
		return $http({
			method: 'DELETE',
			url: '/api/logout'
		})
		.then(function () {
			returnObj.currUser = null;
		})
	}

	return returnObj;
})
