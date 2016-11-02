'use strict';

angular.module('app').controller('LoginController',[
	'LoginService',
	'$scope',
	'$location',
	function(LoginService, $scope, $location){ console.log('LoginController');
		var def = this;

		$scope.user = {
			nick : null,
			password : null
		};

		def.onLoginSuccess = function(response){console.log('SessionService.login.success'); console.log(response);
			$location.path('/chat');
		};
		def.onLoginError = function(error){console.log('SessionService.login.error');console.log(error);
			alert('Błąd', 'Nie udana próba logowania');
		};

		$scope.toRegisterController = function(){console.log('LoginController.toRegisterController');
			$location.path('/register');
		};
		$scope.toMainController = function(){console.log('LoginController.toMainController');
			$location.path('/');
		};
		$scope.loginBtnClick = function(){console.log('LoginController.loginBtnClick()');
			var responsePromise = LoginService.login($scope.user,def.onLoginSuccess, def.onLoginError);
			console.log(responsePromise);
			console.log(responsePromise.value);
		};
	}
]);