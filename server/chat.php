<?php
session_start();
include 'loader.php';
include 'config.php';

if( ! isset($_COOKIE['logged'])){
  echo json_encode([
			'ret' => 'NOT_LOGGED',
			'msg' => 'nie jesteś zalogowany',
			'data' => []
	]);
  exit ;
}

if(isset($_REQUEST['action'])){
	$action = $_REQUEST['action'];
}else{
	$action = null;
}

switch($action){

	case 'add':
		if(isset($_REQUEST['post'])){
			$post = $_REQUEST['post'];
		}else{
			$post = null;
		}

		$chat = \server\service\Service::getChat();
		echo $chat->postAdd($post);

		break;

	case 'readAll':
		
		$chat = \server\service\Service::getChat();
		echo $chat->postReadAll();

		break;

	case 'readLast':

		if(isset($_REQUEST['timestamp'])){
			$timestamp = $_REQUEST['timestamp'];
		}else{
			$timestamp = null;
		}

		$chat = \server\service\Service::getChat();
		echo $chat->postReadLast($timestamp);

		break;

	case 'clear':

		$chat = \server\service\Service::getChat();
		echo $chat->clear();

		break;
}