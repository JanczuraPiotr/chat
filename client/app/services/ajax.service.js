'use strict';

angular.module('app').factory('AjaxService',[
	'$http',
	'$location',
	'$mdDialog',
	function($http, $location, $mdDialog){console.log('AjaxService');
		var def = this;
		def.responseData;

		def.on = {};
		def.on.default = function(response){console.log('AjaxService.on.default()');
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Błąd')
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
					.textContent(response.msg + (response.data.supplement ? '\n objaśnienie : \n'+response.data.supplement : ''))
					.ok('Ok')
			);
			$location.path('/login');
		};

		/**
		 * Komunikacja zakończona kodem 200.
		 *
		 * Gdy przetwarzanie danych zakończone sukcesem w def.responseData.data znajdują się dane, def.responseData.mnm = 'ok'
		 * a def.responseData.cod == 1.
		 *
		 * Gdy przetwarzanie danych nie powiodło się : nazwa błędu znadjuje się w def.responseData.mnm a kod błędu w def.responseData.cod
		 * Kożystając z def.responseData.mnm można wywołać funkcję do jego obsługi. Gdy nie jest zdefinowana wywołana zostanie funkcja domyślna
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
					def.on.default(def.responseData);
				}
			}
		};
		/**
		 * Komunikacja zakończona kodem ~ 200
		 * @returns {undefined}
		 */
		def.requestError = function(){
			// @todo Komunikacja wykorzystująca kody html do obsługi błędów
		};

		def.pub = {
			/**
			 *
			 * @param {string} url
			 * @param {json} data
			 * @param {json} on lista funkcji podmieniajcych domyślne funkcje
			 *									{
			 *										mnmemonic : function,
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
