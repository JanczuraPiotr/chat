'use strict';

var config = {
	url : {
		form : {
			chat : 'chat.php',
			rejestracja : 'rejestracja.php',
			main : 'index.php'
		},
		server : {
			rejestracja : 'server/rejestracja.php?action=rejestracja'
		}
	},
	dom : {
		formLogin : {
			me : {
				el : 'formLogin'
			},
			btnLogin : {
				me : {
					el : 'btnLogin',
					id : '#btnLogin',
					cl : '.btnLogin'
				}
			},
			btnGotoRejestracja : {
				me : {
					el : 'btnGotoRejestracja',
					id : '#btnGotoRejestracja',
					cl : '.btnGotoRejestracja'
				}
			}
		},
		formRejestracja : {
			me : {
				el : 'formRejestracja',
				id : '#formRejestracja',
				cl : '.formRejestracja'
			},
			inputNick : {
				me : {
					el : 'inputNick',
					id : '#inputNick',
					cl : '.inputNick'
				}
			},
			inputPassword1 : {
				me : {
					el : 'inputPassword1',
					id : '#inputPassword1',
					cl : '.inputPassword1'
				}
			},
			inputPassword2 : {
				me : {
					el : 'inputPassword2',
					id : '#inputPassword2',
					cl : '.inputPassword2'
				}
			},
			btnRejestracja : {
				me : {
					el : 'btnRejestracja',
					id : '#btnRejestracja',
					cl : '.btnRejestracja'
				}
			}
		}
	}
};