'use strict';

angular.module('app').controller('LoginController',[
	'SessionService',
	'$scope',
	'$location',
	function(SessionService, $scope, $location){ console.log('LoginController');
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
			var responsePromise = SessionService.session();
			console.log('nick : ' + $scope.user.nick);
			console.log('password : ' + $scope.user.password);
			console.log(responsePromise);
		};
	}
]);