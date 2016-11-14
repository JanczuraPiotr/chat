<?php
namespace server\exceptions;

class NewLogin extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::NEW_LOGIN;
	}

	public function chatExMsg() {
		return 'nie poprawne hasło logowania';
	}

	public function chatExName() {
		return 'exNewLogin';
	}

}