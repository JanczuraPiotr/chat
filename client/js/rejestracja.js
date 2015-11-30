'use strict';

var Rejestracja = function(){
	var def = this;

	def.myFormId = config.dom.formRejestracja.me.id;
	def.inputNickId = config.dom.formRejestracja.inputNick.me.id;
	def.inputPassword1Id = config.dom.formRejestracja.inputPassword1.me.id;
	def.inputPassword2Id = config.dom.formRejestracja.inputPassword2.me.id;
	def.btnRejestracjaId = config.dom.formRejestracja.btnRejestracja.me.id;
	def.btnStronaGlownaId = config.dom.formRejestracja.btnStronaGlowna.me.id;

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
				var resp = JSON.parse(response);
				console.log(response);

				if(resp.data.supplement){
					alert(resp.msg + '\n objaśnienie : \n' + resp.data.supplement);
				}else{
					alert(resp.msg);
				}

				switch(response.ret){
					case 'OK':
						window.location.ref = config.url.form.main;
						break;
					default:

				}
			}
		});
	};

	def.on = {};
	def.pub = {};

	def.on.clickBtnStronaGlowna = function(){
		console.log('btnStronaGlowna');
		window.location.href = config.url.form.main;

	};
	def.on.clickRejestracja = function(){
		console.log('clickRejestracja');
		var nick = $(def.inputNickId,def.myFormId).val();
		var pass1 = $(def.inputPassword1Id,def.myFormId).val();
		var pass2 = $(def.inputPassword2Id,def.myFormId).val();

		if( nick.length === 0 ){
			alert('podaj nick dłuższy niż 4 znaki');
			return;
		}


		def.ajax(nick, pass1, pass2);
	};

	def.init = function(){
		$(def.btnRejestracjaId).bind('click',def.on.clickRejestracja);
		$(def.btnStronaGlownaId).bind('click',def.on.clickBtnStronaGlowna);
	};

	def.init();
	return def.pub;
};