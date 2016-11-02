'use strict';

angular.module('app').controller('RegisterController',[
	'$scope',
	'$location',
	function($scope, $location){ console.log('RegisterController');
		$scope.registrationData = {
			nick : null,
			pass1 : null,
			pass2 : null
		};
 		$scope.toMainController = function(){console.log('RegisterController.toMainController');
					$location.path('/');
		};
		$scope.btnRejestracja = function(){

		};
	}
]);