'use strict';

var Rejestracja = function(){
	var def = this;

	def.myFormId = config.dom.formRejestracja.me.id;
	def.inputNickId = config.dom.formRejestracja.inputNick.me.id;
	def.inputPassword1Id = config.dom.formRejestracja.inputPassword1.me.id;
	def.inputPassword2Id = config.dom.formRejestracja.inputPassword2.me.id;
	def.buttonRejestracjaId = config.dom.formRejestracja.btnRejestracja.me.id;

	def.ajax = function(nick, pass1, pass2){
		console.log(config.url.server.rejestracja);
		$.ajax({
			url : config.url.server.rejestracja,
			data : {
				nick : nick,
				pass1 : pass1,
				pass2 : pass2
			},
			success : function(response, status, xhr){
				console.log(response);
			}
		});
	};

	def.on = {};
	def.pub = {};

	def.on.clickRejestracja = function(){
		console.log('clickRejestracja');
		var nick = $(def.inputNickId,def.myFormId).val();
		var pass1 = $(def.inputPassword1Id,def.myFormId).val();
		var pass2 = $(def.inputPassword2Id,def.myFormId).val();

//		if( nick.length === 0 ){
//			alert('podaj nick');
//			return;
//		}
//		if( pass1.length === 0 || pass2.length === 0 ){
//			alert('wpisz dwa razy to samo hasło');
//			return ;
//		};
//		if( pass1 !== pass2 ){
//			alert('wpisz dwa razy to samo hasło');
//			return ;
//		}

		def.ajax(nick, pass1, pass2);
	};

	def.init = function(){
		$(def.buttonRejestracjaId).bind('click',def.on.clickRejestracja);
	};

	def.init();
	return def.pub;
};