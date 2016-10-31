'use strict';

angular.module('app').controller('MainController',[
	'$scope',
	'$location',
	'SessionService',

	function($scope, $location, SessionService){ console.log('MainController');
		var def = this;
		def.responsePromise;

		def.successFunction = function(response){console.log('MainController.session.success');
			console.log(response);
		};
		def.errorFunction = function(error){console.log('MainController.session.error');
			console.log(error);
		};

		def.responsePromise = SessionService.session(def.successFunction, def.errorFunction);

		$scope.loginBtnClick = function(){console.log('MainController.loginBtnClick()');
			$location.path('/login');
		};
		$scope.registerBtnClick = function(){console.log('MainController.registerBtnClick()');
			$location.path('/register');
		};
		
	}
]);