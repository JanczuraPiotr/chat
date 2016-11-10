<?php
session_start();
include '../loader.php';
include '../Config.php';


try{

	if( ! isset($_COOKIE['logged'])){
		throw new server\exceptions\NotLogged();
	}

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	switch($request->action){

		case 'add':
			if(isset($request->post)){
				$post = filter_var($request->post, FILTER_SANITIZE_STRING, FILTER_NULL_ON_FAILURE);
			}else{
				$post = null;
			}
			if(isset($request->timestamp)){
				$timestamp = filter_var($request->timestamp, FILTER_SANITIZE_STRING, FILTER_NULL_ON_FAILURE);
			}else{
				$timestamp = null;
			}

			$chat = \server\service\Service::getChat();
			echo $chat->postAdd($post, $timestamp);

			break;

		case 'readAll':

			$chat = \server\service\Service::getChat();
			echo $chat->postReadAll();

			break;

		case 'readLast':

			if(isset($request->timestamp)){
				$timestamp = filter_var($request->timestamp, FILTER_SANITIZE_STRING, FILTER_NULL_ON_FAILURE);
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
} catch (\server\exceptions\NotLogged $ex){
		echo json_encode([
				'ret' => $ex->chatExName(),
				'msg' => $ex->chatExMsg(),
				'data' => []
		]);
		exit ;

} catch (Exception $ex) {

}