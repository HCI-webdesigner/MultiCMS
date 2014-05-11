<?php
/*
 * 模块加载文件
 */

/*
 * 框架路由模块加载
 */
include_once('system/core/router.php');

/*
 * 控制器模块加载
 */
include_once('system/core/controller.php');

/*
 * 数据库ORM模块加载
 */
include_once('system/core/db.php');

/*
 * 数据模型模块加载
 */
include_once('system/core/model.php');


/*
 * 框架方法库加载
 */
include_once('system/lib/Sys.php');
$system = new sys();

/*
 * 数据库模块加载
 */
$db = new Database($db_url, $db_port, $db_user, $db_pwd, $db_name, $useDB);

include ('system/lib/UUID.php');