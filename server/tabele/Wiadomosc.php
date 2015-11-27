<?php
namespace server\tabele;

class Wiadomosc{
	/**
	 * identyfikator wiadomości
	 * @var int
	 */
	private $id;
	/**
	 * Identyfikator urzytkownika który napisał wiadomość
	 * @var int
	 */
	private $user_id;
	/**
	 * Treść widomości.
	 * @var string
	 */
	private $tresc;
	/**
	 * Czas zapisania wiadomości w bazie danych
	 * @var tiimestamp
	 */
	private $timestamp;

	/**
	 * @param int $id identyfikator wiadomości
	 * @param int $user_id Identyfikator urzytkownika który napisał wiadomość
	 * @param string $tresc Treść widomości.
	 * @param timestamp $timestamp Czas zapisania wiadomości w bazie danych
	 */
	public function __construct($id, $user_id, $tresc, $timestamp) {
		$this->id = $id;
		$this->user_id = $user_id;
		$this->tresc = $tresc;
		$this->timestamp = $timestamp;
	}
	/**
	 * Identyfikator wiadomości
	 * @return int
	 */
	public function getId(){
		return $this->id;
	}
	/**
	 * Idnetyfikator urzytkownika który napisał wiadomość
	 * @return int
	 */
	public function getUserId(){
		return $this->user_id;
	}
	/**
	 * Treść wiadomości
	 * @return string
	 */
	public function getTresc(){
		return $this->tresc;
	}
	/**
	 * Czas zapisania wiadomości w bazie danych
	 * @return timestamp
	 */
	public function getTimestamp(){
		return $this->timestamp;
	}
}