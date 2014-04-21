<?php
/*
 * Controller类
 * 框架的控制器类，所有的控制器都应继承该类
 */
class Controller {
    /*
     * 构造函数
     * 初始化Controller类
     * @author C860
     */
    function __construct() {

    }

    /*
     * render方法
     * @author C860
     * @param string @page_view 要加载的视图
     * @param array @variables 要传递给视图的变量集
     * 控制器可通过此方法渲染页面
     */
    function render($page_view, $variables = array(), $cache = false) {
        $tpl = new template();

        //缓存设置
        if($cache != false) {
            $tpl->setCacheLifetime($cache);
        }
        
        //向模板传入变量
        $keys = array_keys($variables);
        foreach ($variables as $key => $value) {
            $tpl->assign($key, $value);
        }

        //读取模板并输出
        if(file_exists('Views/templates/' . $page_view . '.html')) {
            $tpl->display($page_view . '.html');
        }
        else {
            include('Views/404.php');
        }
    }


    /*
     * easyRender方法
     * 原版的页面渲染方法，当应用规模不大时可以考虑使用原版的页面渲染方法
     * @author C860
     * @param string @page_view 要加载的视图
     * @param array @variables 要传递给视图的变量集
     * 控制器可通过此方法渲染页面
     */
    function easyRender($page_view, $variables = array()) {
        $view_path = 'Views/easyTemplate/'.$page_view.'.php';
        if(!file_exists($view_path)) {
            include("Views/404.php");
        }
        else {
            extract($variables, EXTR_OVERWRITE);
            include($view_path);
        }
    }
}
