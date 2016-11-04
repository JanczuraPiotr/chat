<?php
namespace server\exceptions;

class UserCreateNickEx extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::USER_CREATE_NICK;
	}

	public function chatExMsg() {
		return 'Nick musi być dłuższy niż 3 znaki';
	}

	public function chatExName() {
		return 'EX_USER_CREATE_NICK';
	}

}