# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 12.0.2-MariaDB)
# Database: GYMSpot
# Generation Time: 2025-11-18 17:02:57 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table community
# ------------------------------------------------------------

DROP TABLE IF EXISTS `community`;

CREATE TABLE `community` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `writer` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;

INSERT INTO `community` (`id`, `title`, `content`, `category`, `writer`, `created_at`)
VALUES
	(23,'제목이고 ','내용이다',NULL,'','2025-11-05 00:50:48'),
	(24,'2제목이고','2내용이다',NULL,'','2025-11-05 01:12:07'),
	(25,'잘되지','응',NULL,'','2025-11-06 20:45:59'),
	(26,'w','w',NULL,'','2025-11-06 21:05:06'),
	(27,'u','u','정보','','2025-11-06 21:37:38'),
	(28,'4','e','식단','','2025-11-06 21:37:52'),
	(29,'할인','할인','할인','','2025-11-06 21:39:40'),
	(30,'운동인증','운동인증','운동인증','','2025-11-06 21:39:54'),
	(31,'전채','전체재댇','전체','','2025-11-06 21:47:37'),
	(32,'111','1111122233','후기','','2025-11-06 22:48:43'),
	(33,'확인중','ㅇㅋ','전체','','2025-11-06 23:08:18'),
	(34,'e','d','정보','','2025-11-09 18:43:36'),
	(35,'dd','ee','정보','','2025-11-09 18:44:16'),
	(36,'dd','ee','정보','','2025-11-09 18:45:20'),
	(37,'j23j','jeej','정보','','2025-11-14 22:30:37'),
	(38,'제목올리고','내용쓰고','정보','user01','2025-11-18 23:13:12'),
	(39,'1','2','식단','user01','2025-11-19 00:06:33'),
	(40,'ㅅ','4','할인','ccc','2025-11-19 00:30:43'),
	(41,'ㅛㅛㅛ','ㅛㅛㅛ','식단','ccc','2025-11-19 00:43:49');

/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table community_comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `community_comment`;

CREATE TABLE `community_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `community_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_community_comment_community` (`community_id`),
  CONSTRAINT `fk_community_comment_community` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` enum('male','female') NOT NULL DEFAULT 'male',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_user_id` (`user_id`),
  UNIQUE KEY `uq_users_contact` (`contact`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `user_id`, `password`, `name`, `contact`, `email`, `address`, `birthdate`, `gender`)
VALUES
	(79,'ccc','@1Qaz2wsx3e','임꺽정 ','01059591818','cof9955@gmail.com','병점삼니다','1990-00-00','male'),
	(101,'ccc1','@1Qaz2wsx3e','ccc','01099555555','q@x..com','q','1990-00-00','male'),
	(108,'ccc112','@1Qaz2wsx3e','임꺽정','01059591812','cof9955@gmail.com','ㅓ너노너논 ','1990-00-00','male'),
	(109,'','','',NULL,NULL,NULL,NULL,'male'),
	(110,'jjdjd','@1Qaz2wsx3e','djdj','01058581616','cof9955@gmail.com','re','1990-00-00','male'),
	(111,'jsjssjsj','@1Qaz2wsx3e','jssj','01099995555','cof9955@gmail.com','qqqqqqqqq','1990-00-00','male');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table workout_schedule
# ------------------------------------------------------------

DROP TABLE IF EXISTS `workout_schedule`;

CREATE TABLE `workout_schedule` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `schedule_date` date NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
