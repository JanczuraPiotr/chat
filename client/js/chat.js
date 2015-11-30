'use strict';

var Chat = function(){
	var def = this;

	def.myFormId   = config.dom.formChat.me.id;
	def.chatEditId = config.dom.formChat.chatEdit.me.id;
	def.chatAllId  = config.dom.formChat.chatAll.me.id;
	def.btnSendId  = config.dom.formChat.btnSend.me.id;
	def.btnExitId  = config.dom.formChat.btnExit.me.id;

	def.run = null;
	def.lastTimestamp = '';

	def.dom = {};
	def.dom.clTest = true;
	def.dom.addPost = function(nick, post, timestamp){
		$(def.chatAllId).append(def.dom.postTemplate(nick,post,timestamp));
		$( def.chatAllId).scrollTop($(def.chatAllId)[0].scrollHeight);
	};
	def.dom.postTemplate = function(nick, post, timestamp){
		var class1 = 'bg-success';
		var class2 = 'bg-warning';
		var class0 = '';
		if( def.dom.clTest ){
			class0 = class1;
		}else{
			class0 = class2;
		}
		def.dom.clTest = !def.dom.clTest;
		var tmpl =
						'<div class="row '+class0+'">'
						+ '<div class="col-sm-2">'+timestamp+'</div>'
						+ '<div class="col-sm-2">'+nick+'</div>'
						+ '<div class="col-sm-8">'+post+'</div>'
						+'</div>';
		return tmpl;
	};

	def.ajaxExit = function(){
		$.ajax({
			url : config.url.server.logout,
			success : function(responseText, status, xhr){
				var resp = JSON.parse(responseText);
				switch (resp.ret){
					case 'OK':
						window.location.href = config.url.form.main;
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
	def.ajaxSend = function(post){
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
							def.dom.addPost(resp.data[post].nick, resp.data[post].post, resp.data[post].timestamp);
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
	def.ajaxCommand = function(command){
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
						$(def.chatAllId).html('');
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
	def.ajaxReadAll = function(){
		var post;
		$.ajax({
			url : config.url.server.chatReadAll,
			success : function(responseText){
				var resp = JSON.parse(responseText);
				switch (resp.ret){
					case 'OK':
						for ( post in resp.data){
							if( def.lastTimestamp < resp.data[post].timestamp ){
								def.lastTimestamp = resp.data[post].timestamp;
							}
							def.dom.addPost(resp.data[post].nick, resp.data[post].post, resp.data[post].timestamp);
						}
						break
					default:
						if(resp.data.supplement){
							alert(resp.msg + '\n objaśnienie : \n' + resp.data.supplement);
						}else{
							alert(resp.msg);
						}
				}
			},
			complete : function(){
				def.ajaxThread = def.ajaxReadLast;
			}
		});
	};
	def.ajaxReadLast = function(){
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
					def.dom.addPost(resp.data[post].nick, resp.data[post].post, resp.data[post].timestamp);
				}
			}
		});
	};
	def.ajaxThread = def.ajaxReadAll;
	def.thread = function(){
		def.ajaxThread();
	};

	def.on = {};

	def.on.clickBtnSend = function(){
		var post = $(def.chatEditId, def.myFormId).val().trim();

		switch( post) {
			case '#clear#' :
				def.ajaxCommand('clear');
				break;
			default:
				def.ajaxSend(post);
		}

		$(def.btnSendId, def.myFormId).prop('disabled', true);
		$(def.chatEditId, def.myFormId).val('');
	};
	def.on.clickBtnExit = function(){
		def.ajaxExit();
	};
	def.on.changeChatEdit = function(e){
		var strVal = $(def.chatEditId, def.myFormId).val();
		if(strVal.length > 0 ){
			$(def.btnSendId, def.myFormId).prop('disabled', false);
		}else{
			$(def.btnSendId, def.myFormId).prop('disabled', true);
		}
		if(e.keyCode === 13){
      $(def.btnSendId).click();
		}
	};


	def.pub = {};

	def.init = function(){
		$(def.btnExitId, def.myFormId).bind('click',def.on.clickBtnExit);
		$(def.btnSendId, def.myFormId).bind('click',def.on.clickBtnSend);
		$(def.chatEditId, def.myFormId).bind('keyup', def.on.changeChatEdit);
		def.run = setInterval(def.thread, config.thread.timeinterval);
	};

	def.init();
	return def.pub;
};

