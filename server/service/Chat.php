<?php
namespace server\service;

use server\Stale;
use server\exceptions\ChatEx;
use server\logic\Post;
use server\tabele\MessageAdmin;

class Chat {
	private static $instance;

	public static function create(){
		if( ! isset(static::$instance )){
			static::$instance = new Chat();
		}
		return static::$instance;
	}

	private function __construct() {}

	public static function postAdd($post, $timestamp){
		$json = '';
		try{
			Post::add($post);
			$resp = Post::readFromTime($timestamp);
			$json = json_encode([
					'cod' => Stale::OK,
					'mnm' => 'ok',
					'msg' => 'postReadLast',
					'data' => $resp
			]);

		} catch ( ChatEx $ex){
			$json = json_encode([
					'cod' => $ex->chatExCode(),
					'mnm' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (\Exception $ex) {
			$json = json_encode([
					'cod' => ChatEx::GENERAL,
					'mnm' => 'exception',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}
	public static function postReadAll(){
		$json = '';
		try{
			$resp = Post::readAll();
			foreach ($resp as $key => $value) {
				$resp[$key]['nick'] = htmlspecialchars($value['nick']);
				$resp[$key]['post'] = htmlspecialchars($value['post']);
			}
			$json = json_encode([
					'cod' => Stale::OK,
					'mnm' => 'ok',
					'msg' => 'postReadLast',
					'data' => $resp
			]);

		} catch ( ChatEx $ex){
			$json = json_encode([
					'cod' => $ex->chatExCode(),
					'mnm' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (\Exception $ex) {
			$json = json_encode([
					'cod' => ChatEx::GENERAL,
					'mnm' => 'exception',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}
	public static function postReadLast($timestamp){
		$json = '';
		try{
			$resp = Post::readFromTime($timestamp);
			foreach ($resp as $key => $value) {
				$resp[$key]['nick'] = htmlspecialchars($value['nick']);
				$resp[$key]['post'] = htmlspecialchars($value['post']);
			}
			$json = json_encode([
					'cod' => Stale::OK,
					'mnm' => 'ok',
					'msg' => 'postReadLast',
					'data' => $resp
			]);

		} catch (ChatEx $ex){
			$json = json_encode([
					'cod' => $ex->chatExCode(),
					'mnm' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (\Exception $ex) {
			$json = json_encode([
					'cod' => ChatEx::GENERAL,
					'mnm' => 'exception',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}
	public static function clear(){
		$json = '';

		try{
			MessageAdmin::truncate(Service::getDB());
			$json = json_encode([
					'cod' => Stale::OK,
					'mnm' => 'ok',
					'msg' => 'postReadLast',
					'data' => []
			]);

		} catch ( ChatEx $ex){
			$json = json_encode([
					'cod' => $ex->chatExCode(),
					'mnm' => $ex->chatExName(),
					'msg' => $ex->chatExMsg(),
					'data' => [
							'supplement' => $ex->getMessage()
					]
			]);
		} catch (\Exception $ex) {
			$json = json_encode([
					'cod' => ChatEx::GENERAL,
					'mnm' => 'exception',
					'msg' => $ex->getMessage(),
					'data' => [	]
			]);
		}
		return $json;
	}

}

