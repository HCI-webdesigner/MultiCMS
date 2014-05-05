<?php
/*
 * 引入Smarty模板引擎
 */
require_once(BASEDIR . '/system/Smarty/libs/Smarty.class.php');
/*
 * 模板引擎类，使用的是Smarty
 */
class template extends Smarty {

    /*
     * 模板引擎构造函数
     * 负责初始化Smarty
     * @author C860
     */
    function __construct() {

        //调用Smarty构造函数
        parent::__construct();

        //设置各类模板目录
        $this->setTemplateDir(BASEDIR . '/Views/templates/');
        $this->setCompileDir(BASEDIR . '/Views/templates_c/');
        $this->setConfigDir(BASEDIR . '/Views/configs/');
        $this->setCacheDir(BASEDIR . '/Views/cache/');

        //判断生产环境，控制模板是否产生缓存
        if(ENVIRONMENT == 'DEV') {
            $this->caching = false;
        }
        else {
            $this->caching = true;
            $this->setCaching(Smarty::CACHING_LIFETIME_SAVED);
        }

        $this->assign('app_name', 'MultiCMS');
        $this->assign('ROOTDIR', BASEDOMAIN);
    }
}
