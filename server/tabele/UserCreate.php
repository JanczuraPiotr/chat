<?php
namespace server\tabele;
use service\DB;
use server\tabele\User;

class UserCreate {
	/**
	 * @var string
	 */
	private static $tableName = 'user';
	/**
	 * @param string $nick
	 * @param string $password
	 * @param DB $db
	 * @return User
	 * @throws \server\exception\UserCreateEx
	 * @throws \server\exception\UserSelectEx
	 */
	public static function create($nick, $password, $db){

		$stmt = null;
		try{
			$stmt = $db->prepare("INSERT INTO `".static::$tableName."` (`nick`, `password` ) VALUES (:nick, :password)");
			$stmt->bindValue(':nick', $nick, \PDO::PARAM_STR);
			$stmt->bindValue(':password', sha1($password), \PDO::PARAM_STR);
			$stmt->execute();
		} catch (\PDOException $e){
			$err = $stmt->errorInfo();
			switch($err[1]){
				case 1062:
					throw new \server\exceptions\UserCreateExistEx();
			}
			throw new \server\exceptions\UserCreateEx();
		} catch (\Exception $e){
			throw new \server\exceptions\UserCreateEx();
		}

		try{
			return UserSelect::selectId($db->lastInsertId(), $db);
		} catch (\PDOException $e){
			throw new \server\exceptions\UserSelectEx();
		} catch (Exception $e) {
			throw new \server\exceptions\UserSelectEx();
		}
	}
}