<?php
namespace server\tabele;

class Message{
	/**
	 * identyfikator wiadomości
	 * @var int
	 */
	private $id;
	/**
	 * Identyfikator użytkownika który napisał wiadomość
	 * @var int
	 */
	private $user_id;
	/**
	 * Treść wiadomości.
	 * @var string
	 */
	private $post;
	/**
	 * Czas zapisania wiadomości w bazie danych
	 * @var timestamp
	 */
	private $timestamp;

	/**
	 * @param int $id identyfikator wiadomości
	 * @param int $user_id Identyfikator użytkownika który napisał wiadomość
	 * @param string $post Treść wiadomości.
	 * @param timestamp $timestamp Czas zapisania wiadomości w bazie danych
	 */
	public function __construct($id, $user_id, $post, $timestamp) {
		$this->id = $id;
		$this->user_id = $user_id;
		$this->post = $post;
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
	 * Identyfikator użytkownika który napisał wiadomość
	 * @return int
	 */
	public function getUserId(){
		return $this->user_id;
	}
	/**
	 * Treść wiadomości
	 * @return string
	 */
	public function getPost(){
		return $this->post;
	}
	/**
	 * Czas zapisania wiadomości w bazie danych
	 * @return timestamp
	 */
	public function getTimestamp(){
		return $this->timestamp;
	}
}