<?php
/*
 * 此文件记录框架的相关配置
 */

/*
 * 开启SESSION
 */
session_start();

/*
 * 默认数据库配置
 */
$useDB = false;          //是否启用数据库
$db_url = 'localhost';   //数据库地址
$db_port = '3306';       //端口
$db_user = 'root';       //用户名
$db_pwd = '123';         //密码
$db_name = 'PFW';        //数据库名

/*
 * 默认控制器
 */
define('DF_CTRLER', 'index');

/*
 * 定义全局静态变量
 */
//获取根目录路径
define('BASEDIR', __dir__ . '/../..');

//获取基础域名
define('BASEDOMAIN', 'http://' . $_SERVER['SERVER_NAME'] . '/MultiCMS');

//运行环境，有两个取值，DEV为开发者环境，PRODUCT为线上环境
define('ENVIRONMENT', 'DEV');
