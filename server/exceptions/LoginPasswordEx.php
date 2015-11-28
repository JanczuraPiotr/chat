<?php
namespace server\exceptions;

class LoginPasswordEx extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::LOGIN_PASSWORD;
	}

	public function chatExMsg() {
		return 'nie poprawne hasło logowania';
	}

	public function chatExName() {
		return 'LOGIN_PASSWORD_EX';
	}

}