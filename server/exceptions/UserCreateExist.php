<?php
namespace server\exceptions;

class UserCreateExist extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::USER_CREATE_EXISTS;
	}

	public function chatExMsg() {
		return 'użytkownik o podanym nicku jest już zarejestrowany';
	}

	public function chatExName() {
		return 'exUserCreateExists';
	}

}

