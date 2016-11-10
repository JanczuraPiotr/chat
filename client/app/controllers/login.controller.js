'use strict';

angular.module('app').controller('LoginController',[
	'$scope',
	'$location',
	'AuthenticationService',
	function($scope, $location, AuthenticationService){
		$scope.user = {
			nick : null,
			password : null
		};

		$scope.toRegisterController = function(){
			$location.path('/register');
		};
		$scope.toMainController = function(){
			$location.path('/');
		};
		$scope.loginBtnClick = function(){
			AuthenticationService.login($scope.user);
		};
	}
]);