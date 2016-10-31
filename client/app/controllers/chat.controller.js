'use strict';

angular.module('app').controller('ChatController',[
	'$scope',
	'$location',
	'SessionService',

	function($scope, $location, SessionService){ console.log('ChatController');
		var def = this;
		def.responsePromise;

		def.successFunction = function(response){console.log('Chatontroller.session.success');
			console.log(response);
		};
		def.errorFunction = function(error){console.log('ChatController.session.error');
			console.log(error);
		};

		def.responsePromise = SessionService.session(def.successFunction, def.errorFunction);

		$scope.sendBtnClick = function(){console.log('ChatController.sendBtnClick()');
		};
		$scope.exitBtnClick = function(){console.log('ChatController.exitBtnClick()');
			SessionService.delete(function(){
					$location.path('/');
				},function(){
					$location.path('/');
				});
		};

	}
]);