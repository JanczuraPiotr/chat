<?php
namespace server\exceptions;

class NotLogged extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::NOT_LEGGED;
	}

	public function chatExMsg() {
		return 'nie jesteś zalogowany';
	}

	public function chatExName() {
		return 'EX_NOT_LOGGED';
	}

}