<?php
/*
 * Database类 
 * 负责数据库相关的操作及初始化，目前只支持MySQL5以上版本
 */
class Database {

    var $_db;     //PDO数据库句柄
    var $_url;    //数据库地址
    var $_port;   //端口
    var $_user;   //用户名
    var $_pwd;    //密码
    var $_name;   //数据库名
    var $_models; //数据模型

    /*
     * 构造函数
     * 框架首次运行对数据库进行初始化
     * @author C860
     * @param string  $url  数据库地址
     * @param int     $port 数据库端口
     * @param string  $user 数据库用户名
     * @param string  $pwd  数据库密码
     * @param string  $name 数据库名
     * @param boolean $use  是否使用数据库
     */
    function __construct($url,$port,$user,$pwd,$name,$use) {

        if($use==false) {
            $this->__destruct();
            return;
        }

        /*
         * 初始化数据库相关变量
         */
        $this->_url = $url;
        $this->_port = $port;
        $this->_user = $user;
        $this->_pwd = $pwd;
        $this->_name = $name;

        /*
         * 连接数据库服务器
         */
        $this->connect();

        /*
         * 选择目标数据库
         */
        $this->chooseDB();

    }

    /*
     * 析构函数
     * 销毁当前类
     */
    function __destruct() {

    }

    /*
     * getModels方法
     * 加载当前所有Models到_models列表中
     * @author C860
     */
    protected function getModels() {
        $dir = opendir('Models/');
        while(($filename=readdir($dir))!==false) {
            if($filename!="."&&$filename!="..") {
                $modelName = explode('.',$filename);
                $this->_models[] = $modelName[0];
            }
        }
    }

    /*
     * connect方法
     * 实现了数据库的连接
     * @author C860
     */
    protected function connect() {
        try {
            $this->_db = new PDO("mysql:host=$this->_url;port=$this->_port",$this->_user,$this->_pwd);
            //禁用预处理
            $this->_db->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
        } catch(PDOException $e) {
            echo 'Error Database connection!';
            exit(0);
        }
    }

    /*
     * chooseDB方法
     * 绑定要操作的数据库，若数据库不存在则创建
     * @author C860
     */
    protected function chooseDB() {
        //查询目标数据库是否存在
        $this->_db->exec('use information_schema');
        $rs = $this->_db->query("select * from SCHEMATA where SCHEMA_NAME = '$this->_name'");
        $result = $rs->fetchAll();
        //若数据库不存在
        if(count($result)<=0) {
            //创建数据库
            $this->createDB();
        }
        $this->_db->exec("use $this->_name");
    }

    /*
     * createDB方法
     * 创建目标数据库
     * @author C860
     */
    protected function createDB() {
        //创建数据库
        try {
            $this->_db->exec("create database $this->_name");
            $this->_db->exec("use $this->_name");
        }
        catch(PDOException $e) {
            echo 'Create Database failed!';
        }

        //创建数据库表
        $this->getModels();   //获取模型列表
        foreach($this->_models as $model) {   //循环映射到数据库
            //加载模型类
            include_once("Models/$model.php");
            //创建反射类
            $ref = new ReflectionClass($model);	
            $properties = $ref->getProperties();
            $regexp = '/(?<=@)[^@\s]+/';   //匹配字段类型
            $qstr = "create table $model(";   //创建表语句
            //循环所有字段
            foreach($properties as $property) {
                $qstr.=$property->getName();
                //标识该字段是否为主键
                $pk = false;
                $doc = $property->getDocComment();
                preg_match_all($regexp,$doc,$type);
                //循环所有字段类型描述
                foreach($type[0] as $t) {
                    if($t=='PRIMARYKEY') {
                        $pk = true;
                    }
                    else {
                        $qstr.=" $t";
                    }
                }
                if($pk==true) {
                    $qstr.=',PRIMARY KEY('.$property->getName().'),';
                }
                else {
                    //若为最后一个字段则不加逗号
                    if($property==$properties[count($properties)-1]) {
                        $qstr.='';
                    }
                    else {
                        $qstr.=',';
                    }
                }
            }
            $qstr.=')';
            $this->_db->exec($qstr);
        }
    }
}

