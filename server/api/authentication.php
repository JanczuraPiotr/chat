<?php
session_start();
include '../loader.php';
include '../Config.php';

switch($_SERVER['REQUEST_METHOD']){


	case 'POST':
		$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
		echo '<pre>'.__FILE__.' '.__LINE__ .'<br>'; print_r($request); echo '</pre>';

		try {

			$user = server\logic\Logowanie::login($request->nick, $request->password);

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

