<?php
namespace server\tabele;
use server\service\DB;

class UserSelect {
	/**
	 * @var string
	 */
	private static $tableName = 'user';

	/**
	 * @param int $id
	 * @param db $db
	 * @return User
	 * @throws \server\exception\UserSelectEx
	 */
	public static function selectId($id, DB $db){
		$stmt = $db->prepare("SELECT * FROM `".static::$tableName."` WHERE `id` = :id");
		$stmt->bindValue(':id', $id, \PDO::PARAM_INT);
		$stmt->execute();
		if( $stmt->rowCount() !== 1 ){
			throw new \server\exceptions\UserSelectEx('szukano względem id');
		}
		$fetch = $stmt->fetch(\PDO::FETCH_ASSOC);
		return new User($fetch['id'], $fetch['nick'], $fetch['password']);
	}
	/**
	 * @param int $nick
	 * @param DB $db
	 * @return \server\tabele\User
	 * @throws \server\exceptions\UserSelectEx
	 */
	public static function selectNick($nick, DB $db){
		$stmt = $db->prepare("SELECT * FROM `".static::$tableName."` WHERE `nick` = :nick");
		$stmt->bindValue(':nick', $nick, \PDO::PARAM_STR);
		$stmt->execute();
		if( $stmt->rowCount() == 0 ){
			throw new \server\exceptions\UserSelectEx('Szukano względem nick');
		}
		$fetch = $stmt->fetch(\PDO::FETCH_ASSOC);
		return new User($fetch['id'], $fetch['nick'], $fetch['password']);
	}

	/**
	 * @param int $nick
	 * @param string $password
	 * @param DB $db
	 * @return \server\tabele\User
	 * @throws \server\exceptions\UserSelectEx
	 */
	public static function select($nick, $password, DB $db){

		$stmt = $db->prepare("SELECT * FROM `".static::$tableName."` WHERE `nick` = :nick AND password = :password");
		$stmt->bindValue(':nick', $nick, \PDO::PARAM_STR);
		$stmt->bindValue(':password', sha1($password));
		$stmt->execute();
		if( $stmt->rowCount() == 0 ){
			throw new \server\exceptions\UserSelectEx('Nie ma użytkownika o podanej kombinacji nick:password');
		}
		$fetch = $stmt->fetch(\PDO::FETCH_ASSOC);
		return new User($fetch['id'], $fetch['nick'], $fetch['password']);
	}
}