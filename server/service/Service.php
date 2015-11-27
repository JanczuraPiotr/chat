<?php
namespace server\service;

use service\Chat;
use service\DB;

class Service {

	public static function getDB(){
		if( ! isset(static::$db) ){
			static::$db = new DB(
					\Config::DB_TYPE
					, \Config::DB_HOST
					, \Config::DB_NAME
					, \Config::DB_PORT
					, \Config::DB_USER
					, \Config::DB_PASS
			);
		};
		return static::$db;
	}
	public static function getChat(){
		if( !isset(static::$chat) ){
			static::$chat = new Chat();
		}
		return static::$chat;
	}

	/**
	 * @var DB
	 */
	static private $db;
	/**
	 * @var Chat
	 */
	static private $chat;
}