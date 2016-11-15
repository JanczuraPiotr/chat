'use strict';

angular.module('app').factory('AuthenticationService',[
	'$location',
	'$cookies',
	'$mdDialog',
	'AjaxService',
	function($location, $cookies, $mdDialog, AjaxService ){console.log('AuthenticationService');
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

			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title(CF.ret.msg.NEW_PASSWORD)
					.textContent(response.msg + (response.data.supplement ? ' : '+response.data.supplement : ''))
					.ok('Ok')
			);
			// @todo po poprawnym zarejestrowaniu okno logowania zawiera wcześniej zapamiętane dane. Przerobić by okno logowania zawierało właśnie utworzone legin i hasło
			$location.path('/login');
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
				var ajaxPromise;

				ajaxPromise = AjaxService.run(CF.url.api.login,{
					action : 'login',
					user : user
				},{
					ok: def.onLoginSuccess,
					exUserSelect : def.onLoginError
				});

				return ajaxPromise;
			},
			logout : function(onLogoutSuccess, onLogoutError){console.log('AuthenticationService.logout()');

				$cookies.remove($cookies);

				if(typeof onLogoutSuccess === 'function'){
					def.onLogoutSuccess = onLogoutSuccess;
				}
				if(typeof onLogoutError === 'function'){
					def.onLogoutError = onLogoutError;
				}

				return AjaxService.run(CF.url.api.login,{
					action: 'logout'
				},{
					ok: def.onLogoutSuccess,
					default: def.onLogoutError
				});
			},
			registration : function(registrationData, onRegistrationSuccess, onRegistrationError){
				var ajaxPromise;

				if(typeof onRegistrationSuccess === 'function'){
					def.onRegistrationSuccess = onRegistrationSuccess;
				}
				if(typeof onRegistrationError === 'function'){
					def.onRegistrationError = onRegistrationError;
				}

				ajaxPromise = AjaxService.run(CF.url.api.registration,{
					action : 'rejestracja',
					data : registrationData
				},{
					ok: def.onRegistrationSuccess,
					// Wszystkie problemy z rejestracją zostaną obsłużone przez metoę default z AjaxService
					//exUserCreateExists : function(response){console.log('AuthenticationService.registration().exUserCreateExists()');
					//	console.log(response);
					//},
				});
				return ajaxPromise;
			}
		};

		return def.pub;
	}
]);