<?php
/*
 * 生成UUID类
 */
class UUID {

    var $uuid;

    /*
     * 构造函数
     */
    function __construct() {
    }

    /*
     * create方法
     * 生成唯一UUID方法
     * @author C860
     * @return string 生成的UUID
     */
    function create() {
        if(!function_exists('uniqid')) {
            $this->uuid = uniqid();
        }
        else {
            $this->uuid = $this->newUUID();
        }
        return $this->uuid;
    }

    /*
     * newUUID方法
     * 自定义的生成UUID方法
     * @author C860
     * @return string 生成的UUID
     */
    protected function newUUID(){
        $microTime = microtime();
        list($a_dec, $a_sec) = explode(" ", $microTime);
        $dec_hex = dechex($a_dec * 1000000);
        $sec_hex = dechex($a_sec);
        $this->cut($dec_hex, 5);
        $this->cut($sec_hex, 6);
        $uuid = "";
        $uuid .= $dec_hex;
        $uuid .= $this->createRandomNumber(3);
        $uuid .= '-';
        $uuid .= $this->createRandomNumber(4);
        $uuid .= '-';
        $uuid .= $this->createRandomNumber(4);
        $uuid .= '-';
        $uuid .= $this->createRandomNumber(4);
        $uuid .= '-';
        $uuid .= $sec_hex;
        $uuid .= $this->createRandomNumber(6);
        return $uuid;
    }

    /*
     * cut方法
     * 根据提供长度值对字符串进行适当裁剪
     * @author C860
     * @param address $string 字符串地址
     * @param int $length 要截取的长度
     * @return NULL
     */
    protected function cut(&$string, $length){
        $strlen = strlen($string);
        if($strlen < $length)
        {
            $string = str_pad($string, $length, '0');
        }
        else if($strlen > $length)
        {
            $string = substr($string, 0, $length);
        }
    }

    /*
     * createRandomNumber
     * 生成十六进制随机字符串
     * @author C860
     * @param int $num 生成字符串长度
     * @return int 返回生成的随机字符串
     */
    protected function createRandomNumber($num){
        $randnum = '';
        for($i=0; $i<$num; $i++)
        {
            $randnum .= dechex(mt_rand(0,15));
        }
        return $randnum;
    }

}