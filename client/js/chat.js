'use strict';

var Chat = function(){
	var def = this;
	def.myFormId = config.dom.formChat.me.id;
	def.chatInId = config.dom.formChat.chatIn.me.id;
	def.chatOutId = config.dom.formChat.chatOut.me.id;
	def.btnSendId = config.dom.formChat.btnSend.me.id;
	def.btnExitId = config.dom.formChat.btnExit.me.id;

	def.ajaxExit = function(){
		$.ajax({
			url : config.url.server.logout,
			success : function(responseText, status, xhr){
				var resp = JSON.parse(responseText);
				switch (resp.ret){
					case 'OK':
						window.location.href = config.url.form.main;
						break;
				}
			}
		});
	};

	def.ajaxSend = function(post){
		$.ajax({
			url : config.url.server.chatAdd,
			data : {
				post : post
			},
			success : function(responseText, status, xhr){
				var resp = JSON.parse(responseText);
				switch (resp.ret){
					case 'OK':
						break;
				}
			}
		});
	};

	def.on = {};
	def.on.clickBtnSend = function(){
		console.log('def.on.clickBtnSend');
		var post = $(def.chatOutId, def.myFormId).val();
		console.log('wiadomość do wysłania : '+post);
		def.ajaxSend(post);
	};
	def.on.clickBtnExit = function(){
		def.ajaxExit();
	},
	def.pub = {};

	def.init = function(){
		$(def.btnExitId, def.myFormId).bind('click',def.on.clickBtnExit);
		$(def.btnSendId, def.myFormId).bind('click',def.on.clickBtnSend);
	};

	def.init();
	return def.pub;
};

