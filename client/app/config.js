'use strict';

var config = _.extend(config || {} , { // Dziedziczenie po poprzedniej wersji chata.
	url : {
		api : {
				session				: 'server/api/session.php',
				login					: 'server/api/authentication.php',
				registration	: 'server/api/authentication.php',
		}
	},
	route : {
		MainController : '/' // @todo czemu nie działa urzywanie stałych w definicji routingu ?
	},
	minNickLength : 4,
	minPassLength : 4
});