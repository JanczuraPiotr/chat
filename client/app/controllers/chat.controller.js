'use strict';

angular.module('app').controller('ChatController',[
	'$scope',
	'$http',
	'$interval',
	'AuthenticationService',

	function($scope, $http, $interval, AuthenticationService){ console.log('ChatController');
		var def = this;

		$scope.model = {};
		$scope.model.store = {};
		$scope.model.add = function(){
			// @work 1 dodawanie odczytanego posta do store
			// @work 2 połączenie $scope.model.store z widokiem,
		};

		def.run = null;
		def.lastTimestamp = '';

		def.ajaxReadAll = function(){
			var post;
			$http.get(config.url.server.chatReadAll)
							.then(function(response){console.log('ChatController.ajaxReadAll().success');
								console.log(response.data.data);
								// @work 1 dodawanie odczytanego posta do store
								for ( post in response.data){
									if( def.lastTimestamp < response.data[post].timestamp ){
										def.lastTimestamp = response.data[post].timestamp;
									}
									__def__.dom.addPost(response.data[post].nick, response.data[post].post, response.data[post].timestamp);
								}
							},function(error){console.log('ChatController.ajaxReadAll().error');

							});
//			$.ajax({
//				url : config.url.server.chatReadAll,
//				success : function(responseText){
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
//				},
//				complete : function(){
//					// Po pobraniu wiadomości zaległych pobieram tylko wiadomości utworzone po ostatnim odczycie
//					// którego czas zapisany jest w zmiennej def.lastTimestamp.
//					__def__.ajaxThread = __def__.ajaxReadLast;
//				}
//			});
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
		__def__.dom.postTemplate = function(nick, post, timestamp){
			var class1 = 'bg-success';
			var class2 = 'bg-warning';
			var class0 = '';
			if( __def__.dom.clTest ){
				class0 = class1;
			}else{
				class0 = class2;
			}
			__def__.dom.clTest = !__def__.dom.clTest;
			var tmpl =
							'<div class="row '+class0+'">'
							+ '<div class="col-sm-2">'+timestamp+'</div>'
							+ '<div class="col-sm-2">'+nick+'</div>'
							+ '<div class="col-sm-8">'+post+'</div>'
							+'</div>';
			return tmpl;
		};

		__def__.ajaxSend = function(post){
			// @todo sporadycznie dodany post wyświetlany jest przez ajax dodający i ajas czytajacy nowe posty
			$.ajax({
				url : config.url.server.chatAdd,
				data : {
					timestamp : def.lastTimestamp, // zaraz po zapisie nowego posta pobiera posty powstałe po tym czasie
					post : post
				},
				success : function(responseText, status, xhr){
					var resp = JSON.parse(responseText);
					switch (resp.ret){
						case 'OK':
							for ( post in resp.data){
								if( def.lastTimestamp < resp.data[post].timestamp ){
									def.lastTimestamp = resp.data[post].timestamp;
								}
								__def__.dom.addPost(resp.data[post].nick, resp.data[post].post, resp.data[post].timestamp);
							}
							break
						default:
							if(resp.data.supplement){
								alert(resp.msg + '\n objaśnienie : \n' + resp.data.supplement);
							}else{
								alert(resp.msg);
							}
					}
				}
			});
		};
		__def__.ajaxCommand = function(command){
			// @todo o wykonanej komendzie należy poinformować wszystkich uruchomionych klientów
			$.ajax({
				url : config.url.server.chatCommand,
				data : {
					action : command
				},
				success : function(responseText, status, xhr){
					var resp = JSON.parse(responseText);
					switch (resp.ret){
						case 'OK':
							$(__def__.chatAllId).html('');
							break;
						default:
							if(resp.data.supplement){
								alert(resp.msg + '\n objaśnienie : \n' + resp.data.supplement);
							}else{
								alert(resp.msg);
							}
					}
				}
			});
		};
		__def__.ajaxReadLast = function(){
			var post;
			$.ajax({
				url : config.url.server.chatReadLast,
				data : {
					timestamp : def.lastTimestamp
				},
				success : function(responseText){
					var resp = JSON.parse(responseText);
					for ( post in resp.data){
						if( def.lastTimestamp < resp.data[post].timestamp ){
							def.lastTimestamp = resp.data[post].timestamp;
						}
						__def__.dom.addPost(resp.data[post].nick, resp.data[post].post, resp.data[post].timestamp);
					}
				}
			});
		};
		__def__.ajaxThread = __def__.ajaxReadAll;
		__def__.thread = function(){
			__def__.ajaxThread();
		};

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
		$scope.sendBtnClick = function(){console.log('ChatController.sendBtnClick()');
		};
		$scope.exitBtnClick = function(){console.log('ChatController.exitBtnClick()');
			AuthenticationService.logout();
		};

		def.init = function(){
			def.ajaxReadAll();
			//def.run = $interval(def.thread, CF.thread.TIME_INTERVAL);
		};

		def.init();


	}
]);