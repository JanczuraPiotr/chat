<?php
session_start();
include 'loader.php';
include 'config.php';


if(isset($_REQUEST['action'])){
	$action = $_REQUEST['action'];
}else{
	$action = null;
}

switch($action){

	case 'rejestracja':

		if( isset($_REQUEST['nick']) ){
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
	default:
		echo json_encode([
				'ret' => 'ERR',
				'msg' => 'błędna komenda',
				'data' => []
		]);

}