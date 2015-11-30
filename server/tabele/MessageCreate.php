<?php
namespace server\tabele;
use server\service\DB;

class MessageCreate {
	public static $tableName = 'message';

	/**
	 * @param int $user_id
	 * @param string $post
	 * @param \server\tabele\DB $db
	 */
	public static function create($user_id, $post, DB $db){
		try{
			$stmt = $db->prepare("INSERT INTO `".static::$tableName."` (`user_id`, `post`) VALUES (:user_id, :post)");
			$stmt->bindValue(':user_id',$user_id, \PDO::PARAM_INT);
			$stmt->bindValue(':post', $post, \PDO::PARAM_STR);
			$stmt->execute();
		} catch (\PDOException $ex){
			throw new \server\exceptions\MessageCreateEx($ex->getMessage());
		} catch (\Exception $ex) {
			throw new \server\exceptions\MessageCreateEx();
		}

	}
}