<?php
namespace server\service;

use server\service\Chat;
use server\service\DB;

class Service {

	/**
	 * @return DB
	 */
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
	/**
	 * @return Chat
	 */
	public static function getChat(){
		return Chat::create();
	}

	/**
	 * @var DB
	 */
	static private $db;

}