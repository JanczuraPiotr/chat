'use strict';

angular.module('app')
				.config(['$routeProvider',function config($routeProvider){
					$routeProvider.when('/',{
						templateUrl : 'client/app/views/main.html',
						controller : 'MainController as mainController'
					})
					.when('/login',{
						templateUrl : 'client/app/views/login-form.html',
						controller : 'LoginController as loginController'
					})
					.when('/register',{
						templateUrl : 'client/app/views/register-form.html',
						controller : 'RegisterController as registerController'
					});
					
					$routeProvider.otherwise({
						redirectTo : '/'
					});
				}]);
