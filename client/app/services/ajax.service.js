'use strict';

angular.module('app').factory('AjaxService',[
	'$http',
	'$location',
	'$cookies',
	'$mdDialog',
	function($http, $location, $cookies, $mdDialog){console.log('AjaxService');
		var def = this;
		def.responseData;

		def.onDefaultFunction = function(response){console.log('AjaxService.donDefaultFunction(');
			console.log(response);
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Błąd podczas komunikacji z serverem')
					.textContent(response.msg + (response.data.supplement ? ' : '+response.data.supplement : ''))
					.ok('Ok')
			);
		};
		def.on = {};
		def.on[CF.ex.cod.OK] = function(){console.log('AjaxService.on.OK');};
		def.on[CF.ex.cod.CHAT] = def.onDefaultFunction;
		def.on[CF.ex.cod.NOT_LOGGED] = def.onDefaultFunction;
		def.on[CF.ex.cod.NEW_PASSWORD] = def.onDefaultFunction;
		def.on[CF.ex.cod.LOGIN_PASSWORD] = def.onDefaultFunction;
		def.on[CF.ex.cod.USER_CREATE] = def.onDefaultFunction;
		def.on[CF.ex.cod.USER_SELECT] = def.onDefaultFunction;
		def.on[CF.ex.cod.USER_CREATE_EXISTS] = def.onDefaultFunction;
		def.on[CF.ex.cod.USER_CREATE_NICK] = def.onDefaultFunction;
		def.on[CF.ex.cod.MESSAGE_CREATE] = def.onDefaultFunction;
		def.on[CF.ex.cod.MESSAGE_SELECT] = def.onDefaultFunction;
		def.on[CF.ex.cod.SESSION_TROUBLE] = def.onDefaultFunction;
		def.on[CF.ex.cod.NOT_LOGGED] = def.onDefaultFunction;;

		def.success = function(response){ console.log('AjaxService.success()');
			def.responseData = response.data;

			switch(def.responseData.ret){
				case CF.ex.mnm[CF.ex.cod.OK]: def.on[CF.ex.cod.OK](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.CHAT]: def.on[CF.ex.cod.CHAT](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.NOT_LOGGED]: def.on[CF.ex.cod.NOT_LOGGED](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.NEW_PASSWORD]: def.on[CF.ex.cod.NEW_PASSWORD](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.LOGIN_PASSWORD]: def.on[CF.ex.cod.LOGIN_PASSWORD](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.USER_CREATE]: def.on[CF.ex.cod.USER_CREATE](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.USER_SELECT]: def.on[CF.ex.cod.USER_SELECT](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.USER_CREATE_EXISTS]: def.on[CF.ex.cod.USER_CREATE_EXISTS](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.USER_CREATE_NICK]: def.on[CF.ex.cod.USER_CREATE_NICK](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.MESSAGE_CREATE]: def.on[CF.ex.cod.MESSAGE_CREATE](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.MESSAGE_SELECT]: def.on[CF.ex.cod.MESSAGE_SELECT](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.SESSION_TROUBLE]: def.on[CF.ex.cod.SESSION_TROUBLE](def.responseData);	break;
				case CF.ex.mnm[CF.ex.cod.NOT_LOGGED]: def.on[CF.ex.cod.NOT_LOGGED](def.responseData);	break;
				default:
					console.log('AjaxService.on.default');
			}

		};
		def.error = function(){};

		def.pub = {
			/**
			 *
			 * @param {string} url
			 * @param {json} data
			 * @param {json} on lista funkcji podmieniajcych domuślne funkcje
			 *									{
			 *										cod : function,
			 *										....
			 *									}
			 * @param {function} finallyFunction funkcja do wykonania na finał komunikacji. AjaxService nie posiada własnej funkcji finalnej
			 * @returns {promise}
			 */
			run : function(url, data, on, finallyFun){console.log('AjaxService.run()');
				if(finallyFun){
					return $http.post(url, data).then(def.success, def.error);
				}else{
					return $http.post(url, data).then(def.success, def.error).finally(def.finnalyFunction);
				}
			}
		};

		return def.pub;
	}
]);
