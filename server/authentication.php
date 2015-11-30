<?php
session_start();
include 'loader.php';
include 'Config.php';

if(isset($_REQUEST['action'])){
	$action = $_REQUEST['action'];
}else{
	$action = null;
}

if(isset($_REQUEST['nick'])){
	$nick = $_REQUEST['nick'];
}else{
	$nick = null;
}
if(isset($_REQUEST['password'])){
	$password = $_REQUEST['password'];
}else{
	$password = null;
}



switch ($action){
	case 'login':

		try {

			$user = server\logic\Logowanie::login($nick, $password);

			echo json_encode([
					'ret' => 'OK',
					'msg' => 'zalogowano',
					'data' => [
							'nick' => htmlspecialchars($user->getNick())
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
		} catch (\Exception $ex) {
				echo json_encode([
						'ret' => 'EXCEPTION',
						'msg' => $ex->getMessage(),
						'data' => [	]
				]);
		}


		break;
	case 'logout':
		server\logic\Logowanie::logout();
		echo json_encode([
				'ret' => 'OK',
				'msg' => 'wylogowano',
				'data' => []
		]);
		break;
}
