/*
 Navicat MySQL Data Transfer

 Source Server         : kang
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost:3306
 Source Schema         : db_turnip

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 29/07/2021 15:59:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_superadmin
-- ----------------------------
DROP TABLE IF EXISTS `t_superadmin`;
CREATE TABLE `t_superadmin`  (
  `t_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `t_email` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `t_password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `t_grade` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '等级',
  `t_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `t_sex` enum('男','女','外星人') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '男' COMMENT '性别',
  `t_age` int(5) UNSIGNED NULL DEFAULT NULL COMMENT '年龄',
  `t_tel` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `t_hobby` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '爱好',
  `t_job` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职业',
  `t_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`t_id`) USING BTREE,
  UNIQUE INDEX `t_id`(`t_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_superadmin
-- ----------------------------
INSERT INTO `t_superadmin` VALUES (1, '2276157075@qq.com', 'turnip', '超级管理员', '唐伟康', '男', 20, '17633505860', '数学，编程', '学生', '2021-07-28 10:57:44');

SET FOREIGN_KEY_CHECKS = 1;
