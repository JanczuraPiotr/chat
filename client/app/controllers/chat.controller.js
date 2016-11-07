'use strict';

angular.module('app').controller('ChatController',[
	'$scope',
	'$http',
	'$timeout',
	'$interval',
	'AuthenticationService',

	function($scope, $http, $timeout, $interval, AuthenticationService){ console.log('ChatController');
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


		def.apiReadAll = function(){
			$http.post(CF.url.api.CHAT,{
				action: 'readAll'
			}).then(function(response){
				var post;
				var posts = response.data.data;
				for ( post in posts){
					$scope.posts.add(posts[post]);
					if( def.lastTimestamp < posts[post].timestamp ){
						def.lastTimestamp = posts[post].timestamp;
					}
				}
			},function(error){console.log('ChatController.apiReadAll().error');

			}).finally(function(){console.log('finally');

			});
		};
		def.apiReadLast = function(){
			$http.post(CF.url.api.CHAT,{
				action: 'readLast',
				timestamp : def.lastTimestamp
			}).then(function(response){
				var post;
				var posts = response.data.data;
				for ( post in posts){
					if( def.lastTimestamp < posts[post].timestamp ){
						def.lastTimestamp = posts[post].timestamp;
					}
					$scope.posts.add(posts[post]);
				}
			},function(error){console.log('ChatController.readLast().error');

			});
		};
		def.apiPostSend = function(){
			$http.post(CF.url.api.CHAT,{
				action : 'add',
				post : $scope.newPost,
				timestamp : def.lastTimestamp,
			}).then(function(response){
				var post;
				var posts = response.data.data;
				switch (response.data.ret){
					case 'OK':
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
				switch(response.data.ret){
					case 'OK':
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