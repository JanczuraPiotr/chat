'use strict';

var config = _.extend(config || {} , { // Dziedziczenie po poprzedniej wersji chata.
	route : {
		MainController : '/' // @todo czemu nie działa urzywanie stałych w definicji routingu ?
	}
});