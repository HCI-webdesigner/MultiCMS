<?php
/*
 * 框架自带方法类
 */
class sys {

    /*
     * 构造函数
     * 初始化系统库中的一些变量
     * @author C860
     */
    function __construct() {
        //初始化flash数组
        $_SESSION['flash'] = [];
    }

    /*
     * setFlash方法
     * 缓冲区方法，生成一个键值对，仅返回客户端一次
     * @author C860
     * @param string $key 键名
     * @param string $val 键值
     */
    static function setFlash($key,$val) {
        $_SESSION['flash'][$key] = $val;
    }

    /*
     * getFlash方法
     * 获取缓冲区数据
     * @author C860
     * @param string $key 键名
     * return false|string
     */
    static function getFlash($key) {
        if(isset($_SESSION['flash'][$key])) {
            $value = $_SESSION['flash'][$key];
            unset($_SESSION['flash'][$key]);
            return $value;
        }
        else {
            return false;
        }
    }

    /*
     * filter方法
     * 过滤SQL攻击
     * @author C860
     * @param string $str 要过滤的数据
     * @return string
     */
    static function filter($str) {
        if(is_array($str)) {
            foreach($str as $key => $val) {
                $str[$key] = daddslashes($val,$force);
            }
        }
        else {
            $str = addslashes($str);
        }
        return $str;
    }

    /*
     * redirect方法
     */
    static function redirect($url) {
        echo '<script type="text/javascript">location.href = \'' . $url . '\';</script>';
        exit(0);
    }

    /*
     * load方法
     * 用于加载系统自带的一些库
     * @author C860
     * @param string $lib 库名
     * return boolean 
     */
    static function load($lib) {
        if(empty($lib)) {
            return false;
        }
        else {
            //若类库已加载
            if(class_exists($lib)) {
                return true;
            }
            //检查类库是否存在
            if(file_exists("system/lib/$lib.php")) {
                include_once("system/lib/$lib.php");
                return true;
            }
            else {
                echo "类库 $lib 加载失败！";
            }
        }
    }
}
