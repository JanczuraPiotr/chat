<?php
session_start();
include 'loader.php';
include 'config.php';

if( ! isset($_SESSION['USER_STATUS'])){
  echo json_encode(array('success'=>FALSE,'code'=>ERR_NOT_LOGIN,'msg'=>'ERR_NOT_LOGIN'));
  exit ;
}

if(isset($_REQUEST['action'])){
	$action = $_REQUEST['action'];
}else{
	$action = null;
}

switch($action){
	case 'login':
		break;
	case 'logout':
		break;
	case 'rejestruj':
		break;
	case 'add-post':
		break;
}