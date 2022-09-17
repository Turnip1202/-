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

 Date: 29/07/2021 15:59:36
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

SET FOREIGN_KEY_CHECKS = 1;
