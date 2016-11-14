'use strict';

angular.module('app').factory('AuthenticationService',[
	'$http',
	'$location',
	'$cookies',
	'$mdDialog',
	'AjaxService',
	function($http, $location, $cookies, $mdDialog, AjaxService ){console.log('AuthenticationService');
		var def = this;

		def.onLoginSuccess = function(response){console.log('AuthenticationService.login.success');
			$location.path('/chat');
		};
		def.onLoginError = function(error){console.log('AuthenticationService.login.error');
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title(CF.ret.msg.USER_SELECT)
					.textContent('Niepoprawne dane do logowania')
					.ok('Ok')
			);
		};
		def.onRegistrationSuccess = function(response){console.log('AuthenticationService.registration.success');
			console.log(response);

			switch(response.data.cod){
				case CF.ret.cod.NEW_PASSWORD:
					$mdDialog.show(
						$mdDialog.alert()
							.clickOutsideToClose(true)
							.title(CF.ret.msg.NEW_PASSWORD)
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
			login : function(user){console.log('AuthenticationService.login(user)');
				var httpPromise;

				httpPromise = AjaxService.run(CF.url.api.login,{
					action : 'login',
					user : user
				},{
					ok: def.onLoginSuccess,
					exUserSelect : def.onLoginError
				});

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

				$http.post(CF.url.api.login, {action : 'logout'}).then(def.onLogoutSuccess, def.onLogoutError);
			},
			registration : function(registrationData, onRegistrationSuccess, onRegistrationError){
				if(typeof onRegistrationSuccess === 'function'){
					def.onRegistrationSuccess = onRegistrationSuccess;
				}
				if(typeof onRegistrationError === 'function'){
					def.onRegistrationError = onRegistrationError;
				}
				$http.post(CF.url.api.registration,{
					action : 'rejestracja',
					data : registrationData
				}).then(def.onRegistrationSuccess, def.onRegistrationError);

			}
		};

		return def.pub;
	}
]);