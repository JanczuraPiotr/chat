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

CF.ret = {	// Stałe zwracane przez server
	cod : {},	// Liczbowy kod wyjątku
	msg : {}	// Wiadomość opisowa wyjątku
};
CF.ret.cod.OK = 1;
CF.ret.msg[CF.ret.cod.OK] = '';
CF.ret.cod.CHAT = -1;
CF.ret.msg[CF.ret.cod.CHAT] = 'Ogólny wyjątek chat-u.';
CF.ret.cod.NEW_PASSWORD = -2;
CF.ret.msg[CF.ret.cod.NEW_PASSWORD] = 'Podany ciąg nie może być hasłem.';
CF.ret.cod.NEW_LOGIN = -3;
CF.ret.msg[CF.ret.cod.NEW_LOGIN] = 'Podany ciąg nie może być logine,.';
CF.ret.cod.USER_CREATE = -4;
CF.ret.msg[CF.ret.cod.USER_CREATE] = 'Nie utworzono użytkownika.';
CF.ret.cod.USER_SELECT = -5;
CF.ret.msg[CF.ret.cod.USER_SELECT] = 'Nie znaleziono użytkownika';
CF.ret.cod.USER_CREATE_EXISTS = -6;
CF.ret.msg[CF.ret.cod.USER_CREATE_EXISTS] = 'Użytkownik o podanej nazwie już ustnieje.';
CF.ret.cod.USER_CREATE_NICK = -7;
CF.ret.msg[CF.ret.cod.USER_CREATE_NICK] = 'Niepoprawny nick';
CF.ret.cod.MESSAGE_CREATE = -8;
CF.ret.msg[CF.ret.cod.MESSAGE_CREATE] = 'Problem z wysłaniem wiadomości.';
CF.ret.cod.MESSAGE_SELECT = -9;
CF.ret.msg[CF.ret.cod.MESSAGE_SELECT] = '';
CF.ret.cod.SESSION_TROUBLE = -10;
CF.ret.msg[CF.ret.cod.SESSION_TROUBLE] = '';
CF.ret.cod.NOT_LOGGED = -11;
CF.ret.msg[CF.ret.cod.NOT_LOGGED] = 'nie jesteś zalogowany';
