<?php
namespace server\logic;
use server\service\Service;
use server\tabele\User;

class Rejestrator {
	/**
	 * @var string
	 */
	private $nick;
	/**
	 * @var string
	 */
	private $pass1;
	/**
	 * @var string
	 */
	private $pass2;
	/**
	 * @var User
	 */
	private $user;

	/**
	 * @param string $nick
	 * @param string $pass1
	 * @param string $pass2
	 */
	public function __construct($nick, $pass1, $pass2) {
		$this->nick = $nick;
		$this->pass1 = $pass1;
		$this->pass2 = $pass2;
	}
	public function rejestruj(){
		$db = Service::getDB();
		$db->prepare('INSERT INTO `user` (`nick`, `password` )');

		return new User(1, 'pjpl', 'dd');
	}
}