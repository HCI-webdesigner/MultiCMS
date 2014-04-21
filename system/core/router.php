<?php
/*
 * 新的Router
 */
Class Router {

    var $_getRule = [];      //存储GET请求规则
    var $_postRule = [];     //存储POST请求规则
    var $_putRule = [];      //存储PUT请求规则
    var $_deleteRule = [];   //存储DELETE请求规则

    /*
     * 构造函数
     * 初始化Router类
     * @author C860
     */
    function __construct() {
        $this->addRule('index', DF_CTRLER);
    }

    /*
     * 析构函数
     * 回收Router类
     * @author C860
     */
    function __destruct() {

    }

    /*
     * addRule函数
     * 增加路由规则
     * @author C860
     * @param string $path 路径
     * @param string $controller 分派的控制器
     * @param string(normal) $request 'normal' 请求的方法
     */
    function addRule($path, $controller, $request='normal') {
        if($request == 'normal') {
            $this->_getRule[$path] = $controller;
            $this->_postRule[$path] = $controller;
        }
        else if(strtolower($request) == 'get') {
            $this->_getRule[$path] = $controller;
        }
        else if(strtolower($request) == 'post') {
            $this->_postRule[$path] = $controller;
        }
        else if(strtolower($request) == 'put') {
            $this->_putRule[$path] = $controller;
        }
        else if(strtolower($request) == 'delete') {
            $this->_deleteRule[$path] = $controller;
        }
    }

    /*
     * getRule函数
     * 获取路由规则
     * @author C860
     * @param string $path 请求路径
     * @param string $method 请求方法
     * @return false|控制器名称
     */
    protected function _getRule($path, $method) {
        if(strtolower($method) == 'get' && array_key_exists($path,$this->_getRule)) {
            return $this->_getRule[$path];
        }
        else if(strtolower($method) == 'post' && array_key_exists($path,$this->_postRule)) {
            return $this->_postRule[$path];
        }
        else if(strtolower($method) == 'put' && array_key_exists($path,$this->_putRule)) {
            return $this->_putRule[$path];
        }
        else if(strtolower($method) == 'delete' && array_key_exists($path,$this->_deleteRule)) {
            return $this->_deleteRule[$path];
        }
        else {
            return false;
        }
    }

    /*
     * run函数
     * 进行路由分派
     * @author C860
     */
    function run() {
        if(preg_match('/.*nginx.*/', $_SERVER['SERVER_SOFTWARE'])) {
            //Ngnix
            $query = isset($_SERVER['QUERY_STRING']) ? trim($_SERVER['QUERY_STRING'],'/') : '/';
        }
        else {
            //Apache
            $query = isset($_SERVER['PATH_INFO']) ? trim($_SERVER['PATH_INFO'],'/') : '/';
        }
        $path = explode('/',$query);
        $method = $_SERVER['REQUEST_METHOD'];
        //加载控制器
        $this->loadControllers($path, $method);
    }

    /*
     * loadController方法
     * @author C860
     * @param array $path 解析后的路径数组
     * @param string $method 请求方法
     * 根据获取的路由规则加载控制器
     */
    protected function loadControllers($path, $method) {
        if($path[0] == '') {
            $_path = DF_CTRLER;
        }
        else {
            $_path = $path[0];
        }

        $controller = $this->_getRule($_path, $method);

        //控制器不存在
        if($controller == false || !file_exists("Controllers/$controller.php")) {
            include('Views/404.php');
        }

        require_once("Controllers/$controller.php");
        $page = new $controller;

        //存储参数
        $params = [];

        if(count($path) > 1 && $path[1] == '') {
            $method = 'index';
        }
        else if(count($path) == 1) {
            $method = 'index';
        }
        else {
            $method = $path[1];
            //存储参数
            $i=2;
            while( isset($path[$i]) && isset($path[$i+1]) ) {
                $params[$path[$i]] = $path[$i+1];
                $i+=2;
            }
        }

        //控制器的方法不存在
        if(method_exists($page, $method)) {
            $page->$method($params);
        }
        else {
            include('Views/404.php');
        }
    }
}
