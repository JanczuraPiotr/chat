'use strict';

angular.module('app').controller('RegisterController',[
	'$scope',
	'$location',
	function($scope, $location){ console.log('RegisterController');

		$scope.toMainController = function(){console.log('RegisterController.toMainController');
					$location.path('/');
		};
	}
]);