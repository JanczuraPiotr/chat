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

		try{
			// @prace sprawdzić XSS htmlspecialchars($string);
			server\logic\Chat::addPost($post);
			echo json_encode([
					'ret' => 'OK',
					'msg' => 'dodano wiadomość',
					'data' => [
							'post' => htmlspecialchars($post)
					]
			]);
		} catch ( \server\exceptions\ChatEx $ex){
			echo json_encode([
					'ret' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (Exception $ex) {
			echo json_encode([
					'ret' => 'EXCEPTION',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		break;
	case 'read':
		break;
}