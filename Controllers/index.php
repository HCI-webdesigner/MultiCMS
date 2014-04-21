<?php
/*
 * 框架默认控制器
 */
class index extends Controller {
    function __construct() {
        //@TODO add something that will be loaded while the controller start to run	
    }

    function index() {
        $vars['indexTitle'] = '你好，MultiCMS！';
        
        //新版视图加载方法
        $this->render('index', $vars);
    }

}
