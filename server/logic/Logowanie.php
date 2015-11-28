<?php
namespace server\logic;

class Logowanie {
	public static function login($nick, $password){
		$return = null;
		$user = \server\tabele\UserSelect::select($nick, $password, \server\service\Service::getDB());
		$expire = time() + 60*60*24*30;
		setcookie('logged', $nick, $expire, '/');
		$_SESSION['user_login'] = $user->getNick();
		$_SESSION['user_id'] = $user->getId();
		return $return;
	}
	public static function logout(){
		setcookie('logged', NULL, 0, '/');
		unset($_SESSION['user_login']);
		unset($_SESSION['user_id']);
	}
}