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

 Date: 29/07/2021 15:58:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_article
-- ----------------------------
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article`  (
  `t_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `t_picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT './T_Image/articleImg/default.jpeg' COMMENT '文章配图',
  `t_headline` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `t_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容',
  `t_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章主要内容',
  `t_tag` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '学习' COMMENT '文章标签',
  `t_route` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章路由',
  `t_date` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '写作时间',
  `t_textNumber` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章字数',
  `t_liveNumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '点赞数',
  `t_readNumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '阅读数',
  `t_reviewNumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '评论数',
  `t_writingPlatform` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'windows' COMMENT '写作平台',
  `t_browser` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '火狐' COMMENT '浏览器',
  `t_key` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '外键',
  PRIMARY KEY (`t_id`) USING BTREE,
  INDEX `t_key`(`t_key`) USING BTREE,
  CONSTRAINT `t_article_ibfk_1` FOREIGN KEY (`t_key`) REFERENCES `t_superadmin` (`t_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_article
-- ----------------------------

-- ----------------------------
-- Table structure for t_article_copy1
-- ----------------------------
DROP TABLE IF EXISTS `t_article_copy1`;
CREATE TABLE `t_article_copy1`  (
  `t_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `t_picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT './T_Image/articleImg/default.jpeg' COMMENT '文章配图',
  `t_headline` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `t_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容',
  `t_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章主要内容',
  `t_tag` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '学习' COMMENT '文章标签',
  `t_route` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章路由',
  `t_date` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '写作时间',
  `t_textNumber` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章字数',
  `t_liveNumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '点赞数',
  `t_readNumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '阅读数',
  `t_reviewNumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '评论数',
  `t_writingPlatform` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'windows' COMMENT '写作平台',
  `t_browser` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '火狐' COMMENT '浏览器',
  `t_key` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '外键',
  PRIMARY KEY (`t_id`) USING BTREE,
  INDEX `t_key`(`t_key`) USING BTREE,
  CONSTRAINT `t_article_copy1_ibfk_1` FOREIGN KEY (`t_key`) REFERENCES `t_superadmin` (`t_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_article_copy1
-- ----------------------------

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

-- ----------------------------
-- Table structure for t_superadmin_copy1
-- ----------------------------
DROP TABLE IF EXISTS `t_superadmin_copy1`;
CREATE TABLE `t_superadmin_copy1`  (
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
-- Records of t_superadmin_copy1
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
