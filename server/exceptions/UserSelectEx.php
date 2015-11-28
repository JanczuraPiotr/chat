<?php
namespace server\exceptions;

class UserSelectEx extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::USER_SELECT;
	}

	public function chatExMsg() {
		return 'nie znaleziono użytwkonika';
	}

	public function chatExName() {
		return 'USER_SELECT_EX';
	}

}