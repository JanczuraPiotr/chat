'use strict';

var CF = {
	url : {
		api : {
				session				: 'server/api/session.php',
				login					: 'server/api/authentication.php',
				registration	: 'server/api/authentication.php',
				CHAT					: 'server/api/chat.php'
		}
	},
	thread : {
		TIME_INTERVAL : 1000
	},
	route : {
		MAIN_CONTROLLER : '/' // @todo czemu nie działa używanie stałych w definicji routingu ?
	},
	MIN_NICK_LENGTH : 4,
	MIN_PASS_LENGTH : 4
};

CF.ex = {		// Wyjątki zgłaszane przez server
	cod : {},	// Liczbowy kod wyjątku
	mnm : {},	// Krótka nazwa wyjątku
	msg : {}	// Wiadomość opisowa wyjątku
};
CF.ex.cod.OK = 1;
CF.ex.mnm[CF.ex.cod.OK] = 'OK';
CF.ex.msg[CF.ex.cod.OK] = '';
CF.ex.cod.CHAT = -1;
CF.ex.mnm[CF.ex.cod.CHAT] = 'EX_CHAT';
CF.ex.msg[CF.ex.cod.CHAT] = 'Ogólny wyjątek chat-u.';
CF.ex.cod.NEW_PASSWORD = -2;
CF.ex.mnm[CF.ex.cod.NEW_PASSWORD] = 'EX_NEW_PASSWORD';
CF.ex.msg[CF.ex.cod.NEW_PASSWORD] = 'Nieudana próba nadania hasła.';
CF.ex.cod.LOGIN_PASSWORD = -3;
CF.ex.mnm[CF.ex.cod.LOGIN_PASSWORD] = 'EX_LOGIN_PASSWORD';
CF.ex.msg[CF.ex.cod.LOGIN_PASSWORD] = 'Błędne dane do logowania.';
CF.ex.cod.USER_CREATE = -4;
CF.ex.mnm[CF.ex.cod.USER_CREATE] = 'EX_USER_CREATE';
CF.ex.msg[CF.ex.cod.USER_CREATE] = 'Nie utworzono użytkownika.';
CF.ex.cod.USER_SELECT = -5;
CF.ex.mnm[CF.ex.cod.USER_SELECT] = 'EX_USER_SELECT';
CF.ex.msg[CF.ex.cod.USER_SELECT] = 'Nie znaleziono użytkownika';
CF.ex.cod.USER_CREATE_EXISTS = -6;
CF.ex.mnm[CF.ex.cod.USER_CREATE_EXISTS] = 'EX_USER_CREATE_EXISTS';
CF.ex.msg[CF.ex.cod.USER_CREATE_EXISTS] = 'Użytkownik o podanej nazwie już ustnieje.';
CF.ex.cod.USER_CREATE_NICK = -7;
CF.ex.mnm[CF.ex.cod.USER_CREATE_NICK] = 'EX_USER_CREATE_NICK';
CF.ex.msg[CF.ex.cod.USER_CREATE_NICK] = 'Niepoprawny nick';
CF.ex.cod.MESSAGE_CREATE = -8;
CF.ex.mnm[CF.ex.cod.MESSAGE_CREATE] = 'EX_MESSAGE_CREATE';
CF.ex.msg[CF.ex.cod.MESSAGE_CREATE] = 'Problem z wysłaniem wiadomości.';
CF.ex.cod.MESSAGE_SELECT = -9;
CF.ex.mnm[CF.ex.cod.MESSAGE_SELECT] = 'EX_MESSAGE_SELECT';
CF.ex.msg[CF.ex.cod.MESSAGE_SELECT] = '';
CF.ex.cod.SESSION_TROUBLE = -10;
CF.ex.mnm[CF.ex.cod.SESSION_TROUBLE] = 'EX_SESSION_TROUBLE';
CF.ex.msg[CF.ex.cod.SESSION_TROUBLE] = '';
CF.ex.cod.NOT_LOGGED = -11;
CF.ex.mnm[CF.ex.cod.NOT_LOGGED] = 'EX_NOT_LOGGED';
CF.ex.msg[CF.ex.cod.NOT_LOGGED] = 'nie jesteś zalogowany';
