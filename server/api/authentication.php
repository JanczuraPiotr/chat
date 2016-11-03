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
	case 'rejestracja':

		if( isset($request->data->nick) ){
			$nick = filter_var($request->data->nick, FILTER_SANITIZE_STRING, FILTER_NULL_ON_FAILURE);
		}else{
			$nick = null;
		}
		if( isset($request->data->pass1) ){
			$pass1 = filter_var($request->data->pass1, FILTER_SANITIZE_STRING, FILTER_NULL_ON_FAILURE);
		}else{
			$pass1 = null;
		}
		if( isset($request->data->pass2) ){
			$pass2 = filter_var($request->data->pass2, FILTER_SANITIZE_STRING, FILTER_NULL_ON_FAILURE);
		}else{
			$pass2 = null;
		}

		try{
			\server\logic\Rejestrator::rejestruj($nick, $pass1, $pass2);
			echo json_encode([
					'ret' => 'OK',
					'msg' => 'zarejestrowano',
					'data' => [
						'nick' => htmlspecialchars($nick),
					]
			]);
		} catch (\server\exceptions\ChatEx $ex) {
			echo json_encode([
					'ret' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		}  catch (\Exception $e){
			echo json_encode([
					'ret' => 'EXCEPTION',
					'msg' => $e->getMessage()
			]);
		}


		break;

	case 'logout':
		session_destroy();
		echo json_encode([]);
		break;

	default:
		echo 'error';
}

