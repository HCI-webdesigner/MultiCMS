<?php
/*
 * PFW
 * 
 * @Template   Smarty v3.1.18
 * @Copyright  Copyright (c) 2013 HCI@C860
 * @Version    0.3.3
 */

/*
 * 加载配置文件
 */
include_once('system/settings/settings.php');
include_once('system/core/moduleLoad.php');

/*
 * 数据库模块初始化
 */
$db_name = 'PFW';
$db = new Database($db_url, $db_port, $db_user, $db_pwd, $db_name, $useDB);

/*
 * 路由分派
 */
$router = new Router();
//===========增加路由规则==============
$router->addRule('index','index');
$router->addRule('main','main');
//===================================
$router->run();