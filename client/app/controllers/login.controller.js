'use strict';

angular.module('app').controller('LoginController',[
	'AuthenticationService',
	'$scope',
	'$location',
	function(AuthenticationService, $scope, $location){ console.log('LoginController');
		var def = this;

		$scope.user = {
			nick : null,
			password : null
		};

		$scope.toRegisterController = function(){console.log('LoginController.toRegisterController');
			$location.path('/register');
		};
		$scope.toMainController = function(){console.log('LoginController.toMainController');
			$location.path('/');
		};
		$scope.loginBtnClick = function(){console.log('LoginController.loginBtnClick()');
			AuthenticationService.login($scope.user);
		};
	}
]);