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
     * @param array $condition 查询条件
     * @param array $order 排序条件
     * @param boolean $reverse 排序是否为逆序
     * @return array|false 返回记录或false
     */
    function fetch($condition = array(), $order = array(), $reverse = true) {
        //预处理查询条件
        $klist = array_keys($condition);
        $vlist = array_values($condition);
        //检查查询条件是否存在
        if(count($klist) > 0) {
            $count = count($klist);
            $queryString = 'select * from ' . strtolower(get_class($this)) . ' where';
            for($i=0; $i<$count; ++$i) {
                $queryString .= ' ' . $klist[$i] . '=?';
            }
        }
        else {
            $queryString = 'select * from ' . strtolower(get_class($this));
        }
        //检查排序条件是否存在
        if(count($order) > 0) {
            $queryString .= ' order by ' . $order[0];
            $queryString .= $reverse?' desc':'';
        }
        //处理查询
        try {
            $query = $this->db->prepare($queryString);
            $query->execute($vlist);
            if($query->rowCount() > 0) {
                return $query->fetchAll();
            }
            else {
                return false;
            }
        } catch(PDOException $e) {
            echo $e;
        }
    }

    /*
     * delete方法
     * 从数据库删除符合条件的记录
     * @author C860
     * @param query 记录的约束条件语句
     */
    function delete($query) {

    }

    /*
     * save方法
     * 将当前对象的数据同步到数据库中
     * @author C860
     */
    function save() {

    }

    /*
     * add方法
     * 将当前对象以添加的方式同步到数据库中
     * @author C860
     */
    function add() {

    }
}
