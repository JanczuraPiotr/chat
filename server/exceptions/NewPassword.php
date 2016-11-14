<?php
namespace server\exceptions;

class NewPassword extends \server\exceptions\ChatEx{
	public function chatExCode() {
		return static::NEW_PASSWORD;
	}

	public function chatExMsg() {
		return 'Nie poprawne wzory haseł';
	}

	public function chatExName() {
		return 'exNewPassword';
	}

}

