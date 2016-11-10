<?php
namespace server\exceptions;

class MessageCreate extends server\exceptions\ChatEx{
	public function chatExCode() {
		return static::MESSAGE_CREATE;
	}

	public function chatExMsg() {
		return 'nie udało się dodać posta';
	}

	public function chatExName() {
		return 'EX_MESSAGE_CREATE';
	}

}