'use strict';

angular.module('app').controller('ChatController',[
	'$scope',
	'$http',
	'$location',
	'$interval',
	'AuthenticationService',

	function($scope, $http, $location, $interval, AuthenticationService){ console.log('ChatController');
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

		var __def__ = this;
		__def__.myFormId   = config.dom.formChat.me.id;
		__def__.chatEditId = config.dom.formChat.chatEdit.me.id;
		__def__.chatAllId  = config.dom.formChat.chatAll.me.id;
		__def__.btnSendId  = config.dom.formChat.btnSend.me.id;
		__def__.btnExitId  = config.dom.formChat.btnExit.me.id;


		__def__.dom = {};
		__def__.dom.clTest = true;
		__def__.dom.addPost = function(nick, post, timestamp){
			$(__def__.chatAllId).append(__def__.dom.postTemplate(nick,post,timestamp));
			$(__def__.chatAllId).scrollTop($(__def__.chatAllId)[0].scrollHeight);
		};

//		__def__.ajaxSend = function(post){
//			// @todo sporadycznie dodany post wyświetlany jest przez ajax dodający i ajas czytajacy nowe posty
//			$.ajax({
//				url : config.url.server.chatAdd,
//				data : {
//					timestamp : def.lastTimestamp, // zaraz po zapisie nowego posta pobiera posty powstałe po tym czasie
//					post : post
//				},
//				success : function(responseText, status, xhr){
//					var resp = JSON.parse(responseText);
//					switch (resp.ret){
//						case 'OK':
//							for ( post in resp.data){
//								if( def.lastTimestamp < resp.data[post].timestamp ){
//									def.lastTimestamp = resp.data[post].timestamp;
//								}
//								__def__.dom.addPost(resp.data[post].nick, resp.data[post].post, resp.data[post].timestamp);
//							}
//							break
//						default:
//							if(resp.data.supplement){
//								alert(resp.msg + '\n objaśnienie : \n' + resp.data.supplement);
//							}else{
//								alert(resp.msg);
//							}
//					}
//				}
//			});
//		};
//		__def__.ajaxCommand = function(command){
//			// @todo o wykonanej komendzie należy poinformować wszystkich uruchomionych klientów
//			$.ajax({
//				url : config.url.server.chatCommand,
//				data : {
//					action : command
//				},
//				success : function(responseText, status, xhr){
//					var resp = JSON.parse(responseText);
//					switch (resp.ret){
//						case 'OK':
//							$(__def__.chatAllId).html('');
//							break;
//						default:
//							if(resp.data.supplement){
//								alert(resp.msg + '\n objaśnienie : \n' + resp.data.supplement);
//							}else{
//								alert(resp.msg);
//							}
//					}
//				}
//			});
//		};

		def.thread = def.apiReadLast;

		__def__.on = {};

		__def__.on.clickBtnSend = function(){
			var post = $(__def__.chatEditId, __def__.myFormId).val().trim();

			switch( post) {
				case '#clear#' :
					__def__.ajaxCommand('clear');
					break;
				__def__ault:
					__def__.ajaxSend(post);
			}

			$(__def__.btnSendId, __def__.myFormId).prop('disabled', true);
			$(__def__.chatEditId, __def__.myFormId).val('');
		};
		__def__.on.clickBtnExit = function(){
			__def__.ajaxExit();
		};
		__def__.on.changeChatEdit = function(e){
			var strVal = $(__def__.chatEditId, __def__.myFormId).val();
			if(strVal.length > 0 ){
				$(__def__.btnSendId, __def__.myFormId).prop('disabled', false);
			}else{
				$(__def__.btnSendId, __def__.myFormId).prop('disabled', true);
			}
			if(e.keyCode === 13){
				$(__def__.btnSendId).click();
			}
		};


		//------------------------------------------------------------------------------


		def.init = function(){
			def.apiReadAll();
			def.run = $interval(def.thread, CF.thread.TIME_INTERVAL);
		};

		def.init();


	}
]);