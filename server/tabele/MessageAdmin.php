<?php
namespace server\tabele;
use server\service\DB;

class MessageAdmin{
	private static $tableName = 'message';

	public static function truncate(DB $db){
		$db->exec("TRUNCATE TABLE `".static::$tableName."`");
	}
}