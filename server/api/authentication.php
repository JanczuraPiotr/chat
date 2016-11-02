<?php
session_start();
include '../loader.php';
include '../Config.php';


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

switch($request->action){


	case 'login':

		try {

			$user = server\logic\Logowanie::login($request->user->nick, $request->user->password);

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
	default:
		echo 'error';
}

