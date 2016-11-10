<?php
namespace server\exceptions;

class UserCreate extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::USER_CREATE;
	}

	public function chatExMsg() {
		return 'nie utworzono użytkownika';
	}

	public function chatExName() {
		return 'EX_USER_CREATE';
	}

}