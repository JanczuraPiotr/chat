<?php
namespace server\logic;
use server\service\Service;
use server\tabele\MessageCreate;
use server\tabele\MessageSelect;

class Post {

	public static function add($post){
		$user_id = null;
		if(isset($_SESSION['user_id'])){
			$user_id = $_SESSION['user_id'];
			MessageCreate::create($user_id, $post, Service::getDB());
		}else {
			throw new Exception('brak identyfikatora zalogowanego użytkownika');
		}

	}
	public static function readAll(){
		$messages = MessageSelect::selectAll(Service::getDB());
		return static::messagesToArray($messages);
	}
	public static function readFromTime($timestamp){
		$messages = MessageSelect::selectFromTime($timestamp, Service::getDB());
		return static::messagesToArray($messages);
	}
	protected static function messagesToArray($messages){
		$arr = [];
		foreach ($messages as $messages_id => $obj) {
			$prop = [];
			$prop['id'] = $obj->getId();
			$prop['nick'] = $obj->getUser(Service::getDB())->getNick();
			$prop['post'] = $obj->getPost();
			$prop['timestamp'] = $obj->getTimestamp();
			$arr[$messages_id] = $prop;
		}
		return $arr;
	}
}