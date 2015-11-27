SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `chat` (
  `message_id` tinyint(3) NOT NULL,
  `session_id` varchar(26) NOT NULL COMMENT 'Id sesji klienta',
  `ip` varchar(15) NOT NULL COMMENT 'Adres IP klienta',
  `text` varchar(255) NOT NULL COMMENT 'Treść wpisu',
  `create_date` datetime NOT NULL COMMENT 'Data utworzenia'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `u_live` (
  `city_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `city` char(32) NOT NULL,
  `address` varchar(64) NOT NULL,
  `date_of_residence` date NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

INSERT INTO `u_live` (`city_id`, `user_id`, `city`, `address`, `date_of_residence`) VALUES
(1, 1, '�?ódź', 'Jana Pawła 65/120', '2015-10-21'),
(2, 2, 'Warszawa', 'Gołębiowa 14', '2010-05-13'),
(3, 3, 'Zakopane', 'Krupówki 2B', '1997-10-06'),
(4, 4, 'Szczecin', 'pl. Wolności 2A', '2015-10-07'),
(5, 5, 'Wojsławice', '14', '2002-01-28'),
(6, 6, 'Pabianice', 'Kolejowa 12/2', '2005-12-05'),
(7, 7, 'Powidź', '124', '2011-04-29'),
(8, 8, 'Mrągowo', 'Wspólna 6', '2015-10-06'),
(9, 9, 'Aleksandrów Mazowiecki', 'Klonowa 16/17/21', '2009-01-04'),
(10, 10, 'Sopot', 'Długa 43', '2015-08-06'),
(11, 11, 'Koszalin', 'Główna 76', '2013-10-13'),
(12, 12, 'Pabianice', 'Klonoa 36', '2015-01-13'),
(13, 4, 'Tarnówek', 'Sympatyczna 234', '2014-06-04'),
(14, 10, 'Szczyrk', 'Fajna Ulica 17', '2014-10-01'),
(15, 1, '�?ódź', 'Rewolucji 1909 201', '2011-06-16');

CREATE TABLE IF NOT EXISTS `u_sex` (
  `user_id` smallint(6) NOT NULL,
  `sex` enum('M','F') NOT NULL DEFAULT 'M',
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `u_sex` (`user_id`, `sex`) VALUES
(1, 'M'),
(2, 'F'),
(3, 'M'),
(4, 'M'),
(5, 'F'),
(6, 'M'),
(7, 'M'),
(8, 'F'),
(9, 'M'),
(10, 'M'),
(11, 'F'),
(12, 'F');

CREATE TABLE IF NOT EXISTS `u_user` (
  `user_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `surname` char(20) NOT NULL,
  `age` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

INSERT INTO `u_user` (`user_id`, `name`, `surname`, `age`) VALUES
(1, 'Jan', 'Kowalski', 35),
(2, 'Barbara', 'Kowalska', 26),
(3, 'Marian', 'Kowalski', 69),
(4, 'Jan', 'Prosty', 41),
(5, 'Monika', 'Kowalska', 56),
(6, 'Andrzej', 'Prosty', 33),
(7, 'Jacek', 'Prosty', 45),
(8, 'Mariana', 'Morelowa', 32),
(9, 'Eustachy', 'Morenga', 92),
(10, 'Marek', 'Placek', 11),
(11, 'Anna', 'Prosta', 14),
(12, 'Paula', 'Guzik', 25);