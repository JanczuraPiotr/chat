<?php
namespace server\service;

class Chat {

	public static function postAdd($post){
		$json = '';
		try{
			$resp = \server\logic\Post::add($post);
			foreach ($resp as $key => $value) {
				$resp[$key]['nick'] = htmlspecialchars($value['nick']);
				$resp[$key]['post'] = htmlspecialchars($value['post']);
			}
			$json = json_encode([
					'ret' => 'OK',
					'msg' => 'dodano wiadomość',
					'data' =>  $resp
			]);
		} catch ( \server\exceptions\ChatEx $ex){
			$json = json_encode([
					'ret' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (Exception $ex) {
			$json = json_encode([
					'ret' => 'EXCEPTION',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}
	public static function postReadAll(){
		$json = '';
		try{
			$resp = \server\logic\Post::readAll();
			foreach ($resp as $key => $value) {
				$resp[$key]['nick'] = htmlspecialchars($value['nick']);
				$resp[$key]['post'] = htmlspecialchars($value['post']);
			}
			$json = json_encode([
					'ret' => 'OK',
					'msg' => 'postReadLast',
					'data' => $resp
			]);

		} catch ( \server\exceptions\ChatEx $ex){
			$json = json_encode([
					'ret' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (Exception $ex) {
			$json = json_encode([
					'ret' => 'EXCEPTION',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}
	public static function postReadLast($timestamp){
		$json = '';
		try{
			$resp = \server\logic\Post::readFromTime($timestamp);
			foreach ($resp as $key => $value) {
				$resp[$key]['nick'] = htmlspecialchars($value['nick']);
				$resp[$key]['post'] = htmlspecialchars($value['post']);
			}
			$json = json_encode([
					'ret' => 'OK',
					'msg' => 'postReadLast',
					'data' => $resp
			]);

		} catch ( \server\exceptions\ChatEx $ex){
			$json = json_encode([
					'ret' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (Exception $ex) {
			$json = json_encode([
					'ret' => 'EXCEPTION',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}
	public static function clear(){
		$json = '';

		try{
			\server\tabele\MessageAdmin::truncate(Service::getDB());
			$json = json_encode([
					'ret' => 'OK',
					'msg' => 'postReadLast',
					'data' => []
			]);

		} catch ( \server\exceptions\ChatEx $ex){
			$json = json_encode([
					'ret' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (Exception $ex) {
			$json = json_encode([
					'ret' => 'EXCEPTION',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}
}