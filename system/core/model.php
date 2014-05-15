<?php
/*
 * Model类
 * 通过ORM映射到数据库
 */
class Model {

    private $db;

    /*
     * 构造函数
     * @author C860
     */
    function __construct() {
        global $db;
        $this->db = $db->getInstance();
    }

    /*
     * fetch方法
     * 从数据库表中获取一条记录
     * @author C860
     * @param array $query 查询表达式
     * @param array $value 查询值
     * @return array|false 返回记录或false
     */
    function fetch($query = '', $value = array()) {
        //判断是否存在查询条件
        if(strlen($query) > 0) {
            $queryString = 'select * from ' . strtolower(get_class($this)) . ' ' . $query;
        }
        else {
            $queryString = 'select * from ' . strtolower(get_class($this));
        }
        try {
            $dbQuery = $this->db->prepare($queryString);
            $dbQuery->execute($value);
            if($dbQuery->rowCount() > 0) {
                return $dbQuery->fetchAll(PDO::FETCH_ASSOC);
            }
            else {
                return false;
            }
        } catch(PDOException $e) {
            echo $e;
            exit(0);
        }
    }

    /*
     * remove方法
     * 从数据库删除符合条件的记录
     * @author C860
     * @param array $query 查询表达式
     * @param array $value 查询值
     * @return boolean 操作是否成功
     */
    function remove($query = '', $value = array()) {
        //判断是否存在查询条件
        if(strlen($query) > 0) {
            $queryString = 'delete from ' . get_class($this) . ' ' . $query;
        }
        else {
            $queryString = 'delete from ' . get_class($this);
        }
        try {
            $dbQuery = $this->db->prepare($queryString);
            if($dbQuery->execute($value)) {
                return true;
            }
            else {
                return false;
            }
        } catch(PDOException $e) {
            echo $e;
            return false;
        }
    }

    /*
     * update方法
     * 将当前对象的数据同步到数据库中
     * @param array $query 查询表达式
     * @param array $value 查询值
     * @author C860
     */
    function update($query = '', $value = array()) {
        $queryString = 'update ' . get_class($this) . ' set ';
        //判断参数合法性
        if(strlen($query) > 0) {
            $queryString .= $query;
        }
        else {
            return false;
        }
        try {
            $dbQuery = $this->db->prepare($queryString);
            if($dbQuery->execute($value)) {
                return true;
            }
            else {
                return false;
            }
        } catch(PDOException $e) {
            echo $e;
            exit(0);
        }
    }

    /*
     * create方法
     * 将当前对象以添加的方式同步到数据库中
     * @author C860
     * @return boolean 是否成功
     */
    function create() {
        $keys = array();
        $values = array();
        //分开存储类的变量成员名和变量值
        foreach ($this as $key => $value) {
            if($key != 'db') {
                array_push($keys, $key);
                array_push($values, $value);
            }
        }
        $queryString = 'insert into ' . get_class($this) . ' (';
        //遍历所有字段名
        $last = array_pop($keys);
        foreach ($keys as $value) {
            $queryString .= $value;
            $queryString .= ',';
        }
        $queryString .= $last;
        $queryString .= ')values(';
        array_push($keys, $last);
        //遍历所有字段值
        $last = array_pop($values);
        foreach ($values as $value) {
            $queryString .= '?';
            $queryString .= ',';
        }
        $queryString .= '?';
        $queryString .= ')';
        array_push($values, $last);
        try {
            $query = $this->db->prepare($queryString);
            if($query->execute($values)) {
                return true;
            }
            else {
                return false;
            }
        } catch(PDOException $e) {
            echo $e;
            exit(0);
        }
    }
}
