'use strict';
// @todo Przewijanie okna wiadomości do ostatniego wiersza - podczas ładowania i zmiany rozmiaru
angular.module('app').controller('ChatController',[
	'$scope',
	'$http',
	'$location',
	'$interval',
	'$mdDialog',
	'AjaxService',
	'AuthenticationService',

	function($scope, $http, $location, $interval, $mdDialog, AjaxService, AuthenticationService){ console.log('ChatController');
		var def = this;
		def.run = null;
		def.lastTimestamp = '';
		$scope.newPost;
		$scope.posts = {};
		$scope.posts.store = {};
		$scope.posts.add = function(post){
			var model = this;
			model.store[post.id] = post;
		};

		$scope.posts.clear = function(){
			var model = this;
			model.store = {};
		};

		$scope.$on('$destroy',function(){console.log('ChatController.destructor()');
			$interval.cancel(def.run);
		});

		AjaxService.run(CF.url.api.CHAT,{
				action: 'readAll'
			},{},function(){console.log('AjaxService.finally');});

		def.apiReadAll = function(){
			$http.post(CF.url.api.CHAT,{
				action: 'readAll'
			}).then(function(response){
				var post;
				var posts = response.data.data;
				switch(response.data.mnm){
					case 'ok':
						for ( post in posts){
							$scope.posts.add(posts[post]);
							if( def.lastTimestamp < posts[post].timestamp ){
								def.lastTimestamp = posts[post].timestamp;
							}
						}
						break;
					case 'exNotLogged':
							$mdDialog.show(
								$mdDialog.alert()
									.clickOutsideToClose(true)
									.title(CF.ret.msg.NOT_LOGGED)
									.textContent(response.data.msg + (response.data.data.supplement ? ' : '+response.data.data.supplement : ''))
									.ok('Ok')
							);
							$location.path('/login');
						break;
				}
			},function(error){console.log('ChatController.apiReadAll().error');

			});
		};
		def.apiReadLast = function(){
			AjaxService.run(CF.url.api.CHAT,{
				action: 'readLast',
				timestamp : def.lastTimestamp
			},{
				ok : function(response){
					var post;
					var posts = response.data.data;
					for ( post in posts){
						if( def.lastTimestamp < posts[post].timestamp ){
							def.lastTimestamp = posts[post].timestamp;
						}
						$scope.posts.add(posts[post]);
					}
				}
			});

//			$http.post(CF.url.api.CHAT,{
//				action: 'readLast',
//				timestamp : def.lastTimestamp
//			}).then(function(response){
//				var post;
//				var posts = response.data.data;
//				for ( post in posts){
//					if( def.lastTimestamp < posts[post].timestamp ){
//						def.lastTimestamp = posts[post].timestamp;
//					}
//					$scope.posts.add(posts[post]);
//				}
//			});
		};
		def.apiPostSend = function(){
			$http.post(CF.url.api.CHAT,{
				action : 'add',
				post : $scope.newPost,
				timestamp : def.lastTimestamp,
			}).then(function(response){
				var post;
				var posts = response.data.data;
				switch (response.data.mnm){
					case 'ok':
						for ( post in posts){
							$scope.posts.add(posts[post]);
							if( def.lastTimestamp < posts[post].timestamp ){
								def.lastTimestamp = posts[post].timestamp;
							}
						}
						$scope.posts.add($scope.newPost);
						$scope.newPost = '';
						break;
					default:
						if(response.data.supplement){
							alert(response.msg + '\n objaśnienie : \n' + response.data.supplement);
						}else{
							alert(response.msg);
						}
				}
			},function(error){console.log('ChatController.apiSend().error()');

			});
		};
		def.apiCommand = function(command){
			$http.post(CF.url.api.CHAT,{
				action : command
			}).then(function(response){
				switch(response.data.mnm){
					case 'ok':
						$scope.posts.clear();
						$scope.posts.add($scope.newPost);
						$scope.newPost = '';
						break;
					default:
						if(response.data.supplement){
							alert(response.msg + '\n objaśnienie : \n' + response.data.supplement);
						}else{
							alert(response.msg);
						}
				}
			},function(error){
			});
		};

		$scope.btnSendClick = function(){console.log('ChatController.sendBtnClick()');
			switch($scope.newPost) {
				case '#clear#' :
					def.apiCommand('clear');
					break;
				default:
					def.apiPostSend($scope.newPost);
			}
		};
		$scope.exitBtnClick = function(){console.log('ChatController.exitBtnClick()');
			AuthenticationService.logout();
		};

		def.init = function(){
			def.apiReadAll();
			def.thread = def.apiReadLast;
			def.run = $interval(def.thread, CF.thread.TIME_INTERVAL);
		};

		def.init();


	}
]);