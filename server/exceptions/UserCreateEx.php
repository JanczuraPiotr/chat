<?php
namespace server\exceptions;

class UserCreateEx extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::USER_CREATE;
	}

	public function chatExMsg() {
		return 'nie utworzono użytkownika';
	}

	public function chatExName() {
		return 'USER_CREATE_EX';
	}

}