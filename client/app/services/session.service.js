'use strict';

angular.module('app').factory('SessionService',[
	'$http',
	'$q',
	function($http,$q){console.log('SessionService');
		var def = this;

		def.sessionSuccess = function(response){console.log('SessionService.session.success'); console.log(response);};
		def.sessionError = function(error){console.log('SessionService.session.error');console.log(error);};
		def.deleteSuccess = function(response){console.log('SessionService.delete.success'); console.log(response);};
		def.deleteError = function(error){console.log('SessionService.delete.error');console.log(error);};

		def.pub = {
			session : function(sessionSuccess, sessionError){console.log('SessionService.session()');
				var httpPromise;
				if(typeof sessionSuccess === 'function'){
					def.sessionSuccess = sessionSuccess;
				}
				if(typeof sessionError === 'function'){
					def.sessionError = sessionError;
				}

				httpPromise = $http.get(config.url.api.session).then(def.sessionSuccess,def.sessionError);

				return httpPromise;

			},
			delete : function(deleteSuccess, deleteError){console.log('SessionService.delete()');
				if(typeof deleteSuccess === 'function'){
					def.deleteSuccess = deleteSuccess;
				}
				if(typeof deleteError === 'function'){
					def.deleteError = deleteError;
				}
				$http.delete(config.url.api.session).then(def.deleteSuccess, def.deleteError);
			}
		};

		return def.pub;
	}
]);