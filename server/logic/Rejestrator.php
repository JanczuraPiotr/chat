<?php
namespace server\logic;
use server\Stale;
use server\service\Service;
use server\tabele\User;
use server\tabele\UserCreate;
use server\exceptions\UserCreateNick;
use server\exceptions\NewPassword;

class Rejestrator {
	/**
	 * @param string $nick
	 * @param string $pass1
	 * @param string $pass2
	 * @return User
	 * @throws \server\exception\NewPasswordEx
	 * @throws \server\exception\UserCreateEx
	 * @throws \server\exception\UserSelectEx
	 */
	public static function rejestruj($nick, $pass1, $pass2){
		// test hasła i utworzoenie zakodowanej wersji
		if(strlen($nick) < Stale::NICK_MIN_LENGHT){
			throw new UserCreateNick();
		}
		if( $pass1 === $pass2){
			if( strlen($pass1) < Stale::PASS_MIN_LENGHT ){
				throw new NewPassword('za krótkie hasła');
			}
		}else{
			throw new NewPassword('różne wzory haseł');
		}
		return UserCreate::create($nick, $pass1, Service::getDB());
	}
}