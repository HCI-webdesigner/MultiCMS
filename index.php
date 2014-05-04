<?php
/*
 * PFW
 * 
 * @Template   Smarty v3.1.18
 * @Copyright  Copyright (c) 2013 HCI@C860
 * @Version    0.3.4
 */

/*
 * 加载配置文件
 */
include_once('system/settings/settings.php');
include_once('system/core/moduleLoad.php');

/*
 * 自定义模块加载
 */
$mods_custom = ['Template'];
sys::loadCustomModule($mods_custom);

/*
 * 路由分派
 */
$router = new Router();
//===========增加路由规则==============
$router->addRule('test','index');
//===================================
$router->run();