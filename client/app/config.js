'use strict';

var config = {
	url : {
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
		timeinterval : 5000
	},
	dom : {
	}
};