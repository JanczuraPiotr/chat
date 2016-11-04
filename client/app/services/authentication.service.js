'use strict';

angular.module('app').factory('AuthenticationService',[
	'$http',
	'$location',
	'$cookies',
	'$mdDialog',
	function($http, $location, $cookies, $mdDialog){console.log('AuthenticationService');
		var def = this;

		def.onLoginSuccess = function(response){console.log('AuthenticationService.login.success');
			$location.path('/chat');
		};
		def.onLoginError = function(error){console.log('AuthenticationService.login.error');console.log(error);};
		def.onRegistrationSuccess = function(response){console.log('AuthenticationService.registration.success');
			console.log(response);

			switch(response.data.ret){
				case CF.ex.mnm.NEW_PASSWORD:
					$mdDialog.show(
						$mdDialog.alert()
							.clickOutsideToClose(true)
							.title(CF.ex.msg.NEW_PASSWORD)
							.textContent(response.data.msg + (response.data.data.supplement ? ' : '+response.data.data.supplement : ''))
							.ok('Ok')
					);
					break;
				default:
					$location.path('/login');
			}

		};
		def.onRegistrationError = function(error){console.log('AuthenticationService.registration.error');
			console.log(error);

		};
		def.onLogoutSuccess = function(response){console.log('AuthenticationService.logout.success'); console.log(response);
			$cookies.remove('logged',{path:'/'});
			$location.path('/');

		};
		def.onLogoutError = function(error){console.log('AuthenticationService.logout.error');console.log(error);
		};

		def.pub = {
			login : function(user, loginSuccess, loginError){console.log('AuthenticationService.login(user)');
				var httpPromise;
				if(typeof loginSuccess === 'function'){
					def.onLoginSuccess = loginSuccess;
				}
				if(typeof loginError === 'function'){
					def.onLoginError = loginError;
				}
				httpPromise = $http.post(config.url.api.login, {
					action : 'login',
					user : user
				}).then(def.onLoginSuccess, def.onLoginError);

				return httpPromise;
			},
			logout : function(onLogoutSuccess, onLogoutError){console.log('AuthenticationService.logout()');
				$cookies.remove($cookies);

				if(typeof onLogoutSuccess === 'function'){
					def.onLogoutSuccess = onLogoutSuccess;
				}
				if(typeof onLogoutError === 'function'){
					def.onLogoutError = onLogoutError;
				}

				$http.post(config.url.api.login, {action : 'logout'}).then(def.onLogoutSuccess, def.onLogoutError);
			},
			registration : function(registrationData, onRegistrationSuccess, onRegistrationError){
				if(typeof onRegistrationSuccess === 'function'){
					def.onRegistrationSuccess = onRegistrationSuccess;
				}
				if(typeof onRegistrationError === 'function'){
					def.onRegistrationError = onRegistrationError;
				}
				$http.post(config.url.api.registration,{
					action : 'rejestracja',
					data : registrationData
				}).then(def.onRegistrationSuccess, def.onRegistrationError);

			}
		};

		return def.pub;
	}
]);