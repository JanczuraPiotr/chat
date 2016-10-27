'use strict';

angular.module('app').controller('MainController',[
	'$scope',
	'$q',
	'SessionService',
	function($scope, $q, SessionService){ console.log('MainController');
		var response;
		response = SessionService.session();
		console.log(response);
		// Przekieruj na logowanie lub rejestrację
	}
]);