<?php
namespace server\tabele;

class User {
	/**
	 * @var int
	 */
	private $id;
	/**
	 * @var string
	 */
	private $nick;
	/**
	 * @var password
	 */
	private $password;

	/**
	 * @param int $id
	 * @param string $nick
	 * @param password $password
	 */
	public function __construct($id, $nick, $password){
		$this->id = $id;
		$this->nick = $nick;
		$this->password = $password;
	}
	/**
	 * @return int
	 */
	public function getId(){
		return $this->id;
	}
	/**
	 * @return string
	 */
	public function getNick(){
		return $this->nick;
	}
	/**
	 * @return password Zakodowane hasło
	 */
	public function getPassword(){
		return $this->password;
	}

}