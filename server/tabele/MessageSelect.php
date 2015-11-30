<?php
namespace server\tabele;
use server\service\DB;

class MessageSelect{
	private static $tableName = 'message';

	public static function selectAll(DB $db){
		$stmt = $db->prepare("SELECT id, user_id, post, timestamp FROM `".static::$tableName."`");
		$stmt->execute();
		return static::stmtToArr($stmt);
	}

	public static function selectFromTime($timestamp, DB $db){
		$stmt = $db->prepare("SELECT id, user_id, post, timestamp FROM `".static::$tableName."` WHERE timestamp > :timestamp");
		$stmt->bindValue(':timestamp', $timestamp, \PDO::PARAM_STR);
		$stmt->execute();
		return static::stmtToArr($stmt);
	}

	protected static function stmtToArr($stmt){
		$arr = [];
		while ( $record = $stmt->fetch()){
			$arr[$record['id']] = new Message(
					$record['id']
					, $record['user_id']
					, $record['post']
					, $record['timestamp']
			);
		}
		return $arr;
	}
}