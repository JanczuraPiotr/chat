'use strict';

angular.module('app').controller('MainController',[
	'$scope',
	'$location',
	'SessionService',

	function($scope, $location, SessionService){
		var def = this;
		def.responsePromise;

		def.successFunction = function(response){
			if(response.data.lenght > 0){
				$location.path('/chat');
			}
		};
		def.errorFunction = function(error){
			console.log(error);
		};

		def.responsePromise = SessionService.session(def.successFunction, def.errorFunction);

		$scope.loginBtnClick = function(){
			$location.path('/login');
		};
		$scope.registerBtnClick = function(){
			$location.path('/register');
		};

	}
]);