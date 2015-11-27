<?php
function classLoader($classname){

	$arr_this_dir = explode('\\', __DIR__);
	$arr_class_dir = explode('\\', $classname);

	$this_dir_first = end($arr_this_dir);
	$class_dir_last = current($arr_class_dir);

	if( $this_dir_first === $class_dir_last ){
		// Jesteśmy w katalogu który jest składową przestrzeni nazw klasy.
		// Tą składową należy usunąć - wynik rozplanowania katalogów.
		array_shift( $arr_class_dir ) ;
	}

	$path = implode('\\', $arr_class_dir).'.php';
	require $path;
}
spl_autoload_register('classLoader');