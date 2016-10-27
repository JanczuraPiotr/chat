'use strict';

var config = {
	url : {
		form : {
			chat : 'chat.php',
			rejestracja : 'rejestracja.php',
			main : 'index.php'
		},
		server : {
			session : 'server/api/session.php',
			rejestracja : 'server/rejestracja.php?action=rejestracja',
			login : 'server/authentication.php?action=login',
			logout : 'server/authentication.php?action=logout',
			chatAdd : 'server/chat.php?action=add',
			chatCommand : 'server/chat.php',
			chatReadAll : 'server/chat.php?action=readAll',
			chatReadLast : 'server/chat.php?action=readLast'
		}
	},
	thread : {
		timeinterval : 5000,
	},
	dom : {
		formChat : {
			me : {
				el : 'chat',
				id : '#chat',
				cl : ''
			},
			chatEdit : {
				me : {
					el : 'chatEdit',
					id : '#chatEdit',
					cl : ''
				}
			},
			chatAll : {
				me : {
					el : 'chatAll',
					id : '#chatAll',
					cl : ''
				}

			},
			btnSend : {
				me : {
					el : 'btnSend',
					id : '#btnSend',
					cl : ''
				}
			},
			btnExit : {
				me : {
					el : 'btnExit',
					id : '#btnExit',
					cl : ''
				}
			}
		},
		formLogin : {
			me : {
				el : 'formLogin',
				id : '#formLogin',
				cl : ''
			},
			inputNick : {
				me : {
					el : 'inputNick',
					id : '#inputNick',
					cl : ''
				}
			},
			inputPassword : {
				me : {
					el : 'inputPassword',
					id : '#inputPassword',
					cl : ''
				}
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
				cl : ''
			},
			inputNick : {
				me : {
					el : 'inputNick',
					id : '#inputNick',
					cl : ''
				}
			},
			inputPassword1 : {
				me : {
					el : 'inputPassword1',
					id : '#inputPassword1',
					cl : ''
				}
			},
			inputPassword2 : {
				me : {
					el : 'inputPassword2',
					id : '#inputPassword2',
					cl : ''
				}
			},
			btnRejestracja : {
				me : {
					el : 'btnRejestracja',
					id : '#btnRejestracja',
					cl : ''
				}
			},
			btnStronaGlowna : {
				me : {
					el : 'btnStronaGlowna',
					id : '#btnStronaGlowna',
					cl : ''

				}
			}
		}
	}
};