'use strict';

angular.module('app').controller('ChatController',[
	'$scope',
	'$location',
	'SessionService',
	'AuthenticationService',

	function($scope, $location, SessionService, AuthenticationService){ console.log('ChatController');
		var def = this;
		def.responsePromise;

		def.successFunction = function(response){console.log('ChatController.session.success');
			console.log(response);
		};
		def.errorFunction = function(error){console.log('ChatController.session.error');
			console.log(error);
		};

		def.responsePromise = SessionService.session(def.successFunction, def.errorFunction);

		$scope.sendBtnClick = function(){console.log('ChatController.sendBtnClick()');
		};
		$scope.exitBtnClick = function(){console.log('ChatController.exitBtnClick()');
			AuthenticationService.logout();
		};

	}
]);