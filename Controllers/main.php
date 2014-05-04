<?php
/*
 * 框架默认控制器
 */
class main extends Controller {
    function __construct() {
        //@TODO add something that will be loaded while the controller start to run 
    }

    function index() {
        $vars['indexTitle'] = 'MultiCMS——HCI内部CMS生成系统';
        
        //新版视图加载方法
        $this->render('addTags', $vars);
    }

}
