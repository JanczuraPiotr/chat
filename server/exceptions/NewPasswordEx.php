<?php
namespace server\exceptions;

class NewPasswordEx extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::NEW_PASSWORD;
	}

	public function chatExMsg() {
		return 'Nie poprawne wzory haseł';
	}

	public function chatExName() {
		return 'EX_NEW_PASSWORD';
	}

}

