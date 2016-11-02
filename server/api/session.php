<?php
session_start();
include '../loader.php';
include '../Config.php';

switch($_SERVER['REQUEST_METHOD']){
	case 'GET':
		if(count($_SESSION)){
			echo json_encode($_SESSION);
		}else{
			echo json_encode([]);
		}
		break;
	case 'DELETE':
		session_destroy();
		echo json_encode([]);
		break;
	default:
		echo 'error';
}
