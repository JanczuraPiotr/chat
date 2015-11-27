'use strict';

var Index = function(){
	var def = this;
	def.on = {};
	def.pub = {};

	def.on.clickLogin = function(){

	};

	def.on.clickGotoRejestracja = function(){
		window.location = config.url.form.rejestracja;
		console.log('clickGotoRejestracja');
	};


	def.init = function(){
		console.log(config.dom.formLogin.btnGotoRejestracja.me.id);
		$(config.dom.formLogin.btnGotoRejestracja.me.id).bind('click',def.on.clickGotoRejestracja);
	}

	def.init();
	return def.pub;
}
