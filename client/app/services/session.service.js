'use strict';

angular.module('app').factory('SessionService',[
	'$http',
	'$q',
	function($http,$q){console.log('SessionService');
		var def = this;
		def.ret;

		def.response = null;
		def.error = null;

		def.pub = {
			session : function(){console.log('SessonService.session()');
				var httpPromise;

				httpPromise = $http.get(config.url.server.session).then(
								function(response){console.log('SessionService.session.success');
									console.log(response);
									def.response = response;
									return def.response;
								}
								,function(error){console.log('SessionService.session.error');
									console.log(error);
									def.semafor = true;
									def.error = error;
								}
							);

				return httpPromise;
			}
		};
		return def.pub;
	}
]);