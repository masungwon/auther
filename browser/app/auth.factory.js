'use strict';

app.factory('AuthFactory', function($http){

	var returnObj = {};

	returnObj.getUser = function(email, password){
		return $http({
			method: 'POST',
			url: 'api/login',
			data: {
				email: email,
				password: password
			}
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
	}

	returnObj.logout = function() {
		return $http({
			method: 'DELETE',
			url: '/api'
		})
	}
	
	return returnObj;
})
