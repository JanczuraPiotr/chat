'use strict';
// @todo Przewijanie okna wiadomości do ostatniego wiersza - podczas ładowania i zmiany rozmiaru
angular.module('app').controller('ChatController',[
	'$scope',
	'$interval',
	'$mdDialog',
	'AjaxService',
	'AuthenticationService',

	function($scope, $interval, $mdDialog, AjaxService, AuthenticationService){ console.log('ChatController');
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

		def.apiReadAll = function(){console.log('ChatController.apiReadAll()');
			AjaxService.run(CF.url.api.CHAT,{
				action : 'readAll'
			},{
				ok:	function(response){console.log('ChatController.apiReadAll().ok()');
							var post;
							var posts = response.data;
							for ( post in posts){
								$scope.posts.add(posts[post]);
								if( def.lastTimestamp < posts[post].timestamp ){
									def.lastTimestamp = posts[post].timestamp;
								}
							}
						}
			});
		};
		def.apiReadLast = function(){
			AjaxService.run(CF.url.api.CHAT,{
				action: 'readLast',
				timestamp : def.lastTimestamp
			},{
				ok:	function(response){
							var post;
							var posts = response.data;
							for ( post in posts){
								if( def.lastTimestamp < posts[post].timestamp ){
									def.lastTimestamp = posts[post].timestamp;
								}
								$scope.posts.add(posts[post]);
							}
						}
			});
		};
		def.apiPostSend = function(){
			AjaxService.run(CF.url.api.CHAT,{
				action : 'add',
				post : $scope.newPost,
				timestamp : def.lastTimestamp,
			},{
				ok:	function(response){
							var post;
							var posts = response.data;

							for ( post in posts){
								$scope.posts.add(posts[post]);
								if( def.lastTimestamp < posts[post].timestamp ){
									def.lastTimestamp = posts[post].timestamp;
								}
							}
							$scope.posts.add($scope.newPost);
							$scope.newPost = '';
						}
			});
		};
		def.apiCommand = function(command){
			AjaxService.run(CF.url.api.CHAT,{
				action : command
			},{
				ok:	function(response){
							$scope.posts.clear();
							$scope.posts.add($scope.newPost);
							$scope.newPost = '';
						}
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