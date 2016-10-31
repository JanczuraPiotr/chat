'use strict';

angular.module('app').factory('SessionService',[
	'$http',
	'$q',
	function($http,$q){console.log('SessionService');
		var def = this;

		def.successFunction = function(response){console.log('SessionService.session.success'); console.log(response);};
		def.errorFunction = function(error){console.log('SessionService.session.error');console.log(error);};

		def.pub = {
			session : function(successFunction, errorFunction){console.log('SessonService.session()');
				var httpPromise;
				if(typeof successFunction === 'function'){
					def.successFunction = successFunction;
				}
				if(typeof errorFunction === 'function'){
					def.errorFunction = errorFunction;
				}

				httpPromise = $http.get(config.url.server.session).then(def.successFunction,def.errorFunction);

				return httpPromise;

			},
			login : function(user){console.log('SessionService.login(user)');
				var httpPromise = $http.post(config.url.server.session).then(def.successFunction,def.errorFunction);
				return httpPromise;
			}
		};

		return def.pub;
	}
]);