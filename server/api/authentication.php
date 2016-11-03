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
			$nick = $_REQUEST['nick'];
		}else{
			$nick = null;
		}
		if( isset($_REQUEST['pass1'])){
			$pass1 = $_REQUEST['pass1'];
		}else{
			$pass1 = null;
		}
		if( isset($_REQUEST['pass2'])){
			$pass2 = $_REQUEST['pass2'];
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

