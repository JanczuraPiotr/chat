<?php
namespace server\exceptions;

abstract class  ChatEx extends \Exception{
	const CHAT = 1;
	const NEW_PASSWORD = 2;
	const LOGIN_PASSWORD = 3;
	const USER_CREATE = 4;
	const USER_SELECT = 5;
	const USER_CREATE_EXISTS = 6;
	const USER_CREATE_NICK = 7;
	const SESSION_TROUBLE = 8;

	public function __construct($message = '') {
		parent::__construct($message,  $this->chatExCode(), NULL);
	}
	public abstract function chatExCode();
	public abstract function chatExName();
	public abstract function chatExMsg();
}