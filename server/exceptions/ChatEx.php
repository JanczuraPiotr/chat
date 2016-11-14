<?php
namespace server\exceptions;
use server\Stale;

abstract class  ChatEx extends \Exception{
	const OK									= Stale::OK;
	const GENERAL							= Stale::ERR;
	const CHAT								= -1;
	const NEW_PASSWORD				= -2;
	const NEW_LOGIN						= -3;
	const USER_CREATE					= -4;
	const USER_SELECT					= -5;
	const USER_CREATE_EXISTS	= -6;
	const USER_CREATE_NICK		= -7;
	const MESSAGE_CREATE			= -8;
	const MESSAGE_SELECT			= -9;
	const SESSION_TROUBLE			= -10;
	const NOT_LEGGED					= -11;

	public function __construct($message = '') {
		parent::__construct($message,  $this->chatExCode(), NULL);
	}
	public abstract function chatExCode();
	public abstract function chatExName();
	public abstract function chatExMsg();
}