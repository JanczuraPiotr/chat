'use strict';

var Index = function(){
	var def = this;

	def.myFormId = config.dom.formLogin.me.id;
	def.inputNickId = config.dom.formLogin.inputNick.me.id;
	def.inputPasswordId = config.dom.formLogin.inputPassword.me.id;
	def.btnGotoRejestracjaId = config.dom.formLogin.btnGotoRejestracja.me.id;
	def.btnLogowanieId = config.dom.formLogin.btnLogin.me.id;

	def.on = {};
	def.pub = {};

	def.ajaxLogin = function(nick, password){
		$.ajax({
			url : config.url.server.login,
			data : {
				nick : nick,
				password : password
			},
			success : function(response, status, xhr){
				var resp = JSON.parse(response);
				console.log(response);

				switch(resp.ret){
					case 'OK':
						console.log($.cookie('logged'));
						window.location.href = config.url.form.chat;
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

	def.on.clickBtnLogin = function(){
		var nick = $(def.inputNickId,def.myFormId).val();
		var password = $(def.inputPasswordId,def.myFormId).val();
		console.log(nick);
		console.log(password);
		def.ajaxLogin(nick, password);
	};

	def.on.clickBtnGotoRejestracja = function(){
		window.location = config.url.form.rejestracja;
		console.log('clickGotoRejestracja');
	};


	def.init = function(){
		$(def.btnLogowanieId).bind('click',def.on.clickBtnLogin);
		$(def.btnGotoRejestracjaId).bind('click',def.on.clickBtnGotoRejestracja);
	}

	def.init();
	return def.pub;
}
