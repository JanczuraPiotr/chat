'use strict';

angular.module('app').controller('RegisterController',[
	'$scope',
	'$location',
	'AuthenticationService',
	function($scope, $location, AuthenticationService){

		$scope.ct = {
			minNickLength : CF.MIN_NICK_LENGTH,
			minPassLength : CF.MIN_PASS_LENGTH
		};

		$scope.user = {
			nick : null,
			pass1 : null,
			pass2 : null
		};

		$scope.error = {
			nick : {
				short : false
			},
			pass : {
				same : false
			},
			pass1 : {
				length : false
			},
			pass2 : {
				length : false
			}
		};

 		$scope.toMainController = function(){
			$location.path('/');
		};
		$scope.rejestruj = function(){
			var error = false;
			if(($scope.user.nick) && ($scope.user.nick.length < CF.MIN_NICK_LENGTH)){
				error = true;
				$scope.error.nick.length = true;
			}
			if(($scope.user.pass1) && ($scope.user.pass1.length < CF.MIN_PASS_LENGTH)){
				error = true;
				$scope.error.pass1.length = true;
			}
			if(($scope.user.pass2) && ($scope.user.pass2.length < CF.MIN_PASS_LENGTH)){
				error = true;
				$scope.error.pass2.length = true;
			}
			if($scope.user.pass1 !== $scope.user.pass2){
				error = true;
				$scope.error.pass.same = true;
			}

			if(!error){
				AuthenticationService.registration($scope.user);
			}
		};
	}
]);