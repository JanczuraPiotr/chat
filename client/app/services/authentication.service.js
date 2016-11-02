'use strict';

angular.module('app').factory('LoginService',[
	'$http',
	'$q',
	function($http,$q){console.log('LoginService');
		var def = this;

		def.onLoginSuccess = function(response){console.log('LoginService.login.success'); console.log(response);};
		def.onLoginError = function(error){console.log('LoginService.login.error');console.log(error);};
		def.onRegistrationSuccess = function(response){console.log('LoginService.registration.success'); console.log(response);};
		def.onRegistrationError = function(error){console.log('LoginService.registration.error');console.log(error);};

		def.pub = {
			login : function(user, loginSuccess, loginError){console.log('LoginService.login(user)');
				var httpPromise;
				if(typeof loginSuccess === 'function'){
					def.onLoginSuccess = loginSuccess;
				}
				if(typeof loginError === 'function'){
					def.onLoginError = loginError;
				}
				httpPromise = $http.post(config.url.api.login, user).then(def.onLoginSuccess, def.onLoginError);

				return httpPromise;
			},
			registration : function(registrationData, onRegistrationSuccess, onRegistrationError){
				if(typeof onRegistrationSuccess === 'function'){
					def.onRegistrationSuccess = onRegistrationSuccess;
				}else{

				}
				if(typeof onRegistrationError === 'function'){
					def.onRegistrationError = onRegistrationError;
				}
			}
		};

		return def.pub;
	}
]);