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

/*Table structure for table `t_superadmin` */

DROP TABLE IF EXISTS `t_superadmin`;

CREATE TABLE `t_superadmin` (
  `t_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `t_email` varchar(20) NOT NULL COMMENT '邮箱',
  `t_password` varchar(20) NOT NULL COMMENT '密码',
  `t_grade` varchar(10) DEFAULT NULL COMMENT '等级',
  `t_name` varchar(10) DEFAULT NULL COMMENT '姓名',
  `t_sex` enum('男','女','外星人') DEFAULT '男' COMMENT '性别',
  `t_age` int(5) unsigned DEFAULT NULL COMMENT '年龄',
  `t_tel` varchar(30) NOT NULL COMMENT '手机号',
  `t_hobby` tinytext COMMENT '爱好',
  `t_job` varchar(20) DEFAULT NULL COMMENT '职业',
  `t_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `t_id` (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `t_superadmin` */

insert  into `t_superadmin`(`t_id`,`t_email`,`t_password`,`t_grade`,`t_name`,`t_sex`,`t_age`,`t_tel`,`t_hobby`,`t_job`,`t_date`) values (1,'2276157075@qq.com','turnip','超级管理员','唐伟康','男',20,'17633505860','数学，编程','学生','2021-07-28 10:57:44');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
