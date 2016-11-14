'use strict';

angular.module('app').factory('AjaxService',[
	'$http',
	'$location',
	'$cookies',
	'$mdDialog',
	function($http, $location, $cookies, $mdDialog){console.log('AjaxService');
		var def = this;
		def.responseData;

		def.on = {};
		def.on.defaultFunction = function(response){console.log('AjaxService.on.defaultFunction()');
			console.log(response);
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Błąd podczas komunikacji z serverem')
					.textContent(response.msg + (response.data.supplement ? ' : '+response.data.supplement : ''))
					.ok('Ok')
			);
		};
		def.on.ok = function(){console.log('AjaxService.on.ok()');};
		def.on.exNotLogged = function(response){
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Błąd')
					.textContent(response.msg + (response.data.supplement ? ' : '+response.data.supplement : ''))
					.ok('Ok')
			);
			$location.path('/login');
		};

//		def.on.exChat = def.on.defaultFunction;
//		def.on.exNewPassword = def.on.defaultFunction;
//		def.on.exNewLogin = def.on.defaultFunction;
//		def.on.exUserCreate = def.on.defaultFunction;
//		def.on.exUserSelect = def.on.defaultFunction;
//		def.on.exUserCreateExists = def.on.defaultFunction;
//		def.on.exUserCreateNick = def.on.defaultFunction;
//		def.on.exMessageCreate = def.on.defaultFunction;
//		def.on.exMessageSelect = def.on.defaultFunction;
//		def.on.exSessionTrouble = def.on.defaultFunction;

		/**
		 * Komunikacja zakończone kodem 200.
		 * Poprawnie wykonanane zapytanie może
		 * @param {type} response
		 * @returns {undefined}
		 */
		def.requestSuccess = function(response){ console.log('AjaxService.success()');
			def.responseData = response.data;
			if(def.responseData.mnm === 'ok'){
				def.on.ok(def.responseData);
			}else{
				if(def.on[def.responseData.mnm]){
					def.on[def.responseData.mnm](def.responseData);
				}else{
					def.on.defaultFunction(def.responseData);
				}
			}
		};
		/**
		 * Komunikacja zakończona kodem ~ 200
		 * @returns {undefined}
		 */
		def.requestError = function(){};

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
				def.on = _.defaults(on,def.on);
				if(finallyFun){
					return $http.post(url, data).then(def.requestSuccess, def.requestError);
				}else{
					return $http.post(url, data).then(def.requestSuccess, def.requestError).finally(def.finnalyFunction);
				}
			}
		};

		return def.pub;
	}
]);
