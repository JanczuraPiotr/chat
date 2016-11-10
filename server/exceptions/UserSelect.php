<?php
namespace server\exceptions;

class UserSelect extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::USER_SELECT;
	}

	public function chatExMsg() {
		return 'nie znaleziono użytkownika';
	}

	public function chatExName() {
		return 'EX_USER_SELECT';
	}

}