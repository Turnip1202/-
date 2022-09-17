/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.7.22-log : Database - db_turnip
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_turnip` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_turnip`;

/*Table structure for table `t_article` */

DROP TABLE IF EXISTS `t_article`;

CREATE TABLE `t_article` (
  `t_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `t_picture` varchar(255) DEFAULT './T_Image/articleImg/default.jpeg' COMMENT '文章配图',
  `t_headline` varchar(100) NOT NULL COMMENT '文章标题',
  `t_content` text NOT NULL COMMENT '文章内容',
  `t_text` text COMMENT '文章主要内容',
  `t_tag` varchar(20) NOT NULL DEFAULT '学习' COMMENT '文章标签',
  `t_route` varchar(20) NOT NULL COMMENT '文章路由',
  `t_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '写作时间',
  `t_textNumber` varchar(100) DEFAULT NULL COMMENT '文章字数',
  `t_liveNumber` varchar(20) DEFAULT '0' COMMENT '点赞数',
  `t_readNumber` varchar(20) DEFAULT '0' COMMENT '阅读数',
  `t_reviewNumber` varchar(20) DEFAULT '0' COMMENT '评论数',
  `t_writingPlatform` varchar(20) DEFAULT 'windows' COMMENT '写作平台',
  `t_browser` varchar(20) DEFAULT '火狐' COMMENT '浏览器',
  `t_key` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '外键',
  PRIMARY KEY (`t_id`),
  KEY `t_key` (`t_key`) USING BTREE,
  CONSTRAINT `t_article_ibfk_1` FOREIGN KEY (`t_key`) REFERENCES `t_superadmin` (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `t_article` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
