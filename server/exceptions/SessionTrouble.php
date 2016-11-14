<?php
namespace server\exceptions;

class SessionTrouble extends ChatEx{
	public function chatExCode() {
		return static::SESSION_TROUBLE;
	}

	public function chatExMsg() {
		return 'problemy ze stanem sesji';
	}

	public function chatExName() {
		return 'exSessionTrouble';
	}

}