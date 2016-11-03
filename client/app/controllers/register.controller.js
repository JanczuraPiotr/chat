'use strict';

angular.module('app').controller('RegisterController',[
	'AuthenticationService',
	'$scope',
	'$location',
	function(AuthenticationService, $scope, $location){ console.log('RegisterController');

		$scope.ct = {
			minNickLength : CONFIG.minNickLength,
			minPassLength : CONFIG.minPassLength
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

 		$scope.toMainController = function(){console.log('RegisterController.toMainController');
			//$location.path('/');
			var modal = new ModalTemplate({
                nm       : 'test',
                style    : 'width: 300px',
                title    : 'test',
                body     : '<div> dialog modal body</div>',
                onSubmit : function(){console.log('dialog.onSubmit()');},
                onCancel : function(){console.log('dialog.onCancel()');}
            });
		};
		$scope.rejestruj = function(){console.log('RegisterController.rejestruj()');
			var error = false;
			if(($scope.user.nick) && ($scope.user.nick.length < CONFIG.minNickLength)){
				error = true;
				$scope.error.nick.length = true;
			}
			if(($scope.user.pass1) && ($scope.user.pass1.length < CONFIG.minPassLength)){
				error = true;
				$scope.error.pass1.length = true;
			}
			if(($scope.user.pass2) && ($scope.user.pass2.length < CONFIG.minPassLength)){
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