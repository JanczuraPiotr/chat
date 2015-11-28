<?php
namespace server\logic;

class Chat {

	public static function addPost($post){
		$user_id = null;
		if(isset($_SESSION['user_id'])){
			$user_id = $_SESSION['user_id'];
			\server\tabele\MessageCreate::create($user_id, $post, \server\service\Service::getDB());
		}else {
			throw new Exception('brak identyfikatora zalogowanego użytkownika');
		}

	}
}