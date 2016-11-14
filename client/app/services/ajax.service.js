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

		/**
		 * Komunikacja zakończone kodem 200.
		 * Gdy przetwarzanie danych zakończone sukcesem w def.responseData.data znajdują się dane
		 * Gdy przetwarzanie danych nie powiodło się : nazwa błędu znadjuje się w def.responseData.mnm a kod błędu w def.responseData.cod
		 * Kożystając z def.responseData.mnm można wywołać funkcję do jego obsługi.
		 * Gdy nie jest zdefinowana wywołana zosrtanie funkcja domyślna
		 * @param {type} response
		 * @returns {undefined}
		 */
		def.requestSuccess = function(response){ console.log('AjaxService.success()');
			def.responseData = response.data;
			if(def.responseData.mnm === 'ok'){
				def.on.ok(def.responseData);
			}else{
				// żadanie zakończone z błędem kotórego
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
