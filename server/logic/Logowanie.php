<?php
namespace server\logic;

use server\tabele\UserSelect;
use server\service\Service;

// @todo dopracować logowanie obsługę sesji i cookies
class Logowanie {
	public static function login($nick, $password){
		$user = UserSelect::select($nick, $password, Service::getDB());
		$expire = time() + 60*60*24*30;
		setcookie('logged', $nick, $expire, '/');
		$_SESSION['user_login'] = $user->getNick();
		$_SESSION['user_id'] = $user->getId();
		return $user;
	}
	public static function logout(){
		setcookie('logged', NULL, 0, '/');
		unset($_SESSION['user_login']);
		unset($_SESSION['user_id']);
	}
	public static function check(){
		if(count($_SESSION)){
			echo json_encode($_SESSION);
		}else{
			echo json_encode([]);
		}

	}
}