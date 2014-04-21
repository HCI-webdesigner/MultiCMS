<?php
/*
 * SecurityCode类
 * 框架自带验证码类
 * 使用注意事项：请勿在前端页面使用此类，此类初始化后输出的格式为image/png，用户应使用独立页面初始化此类，然后在前端页面嵌入该独立页面。
 */
class SecurityCode {
    /*
     * 构造函数
     * @author C860
     */
    function __construct() {
        //生成验证码
        $this->create();
    }

    /*
     * create方法
     * 生成验证码图片
     * @author C860
     */
    protected function create() {
        $num=4;       //验证码个数
        $width=80;    //验证码宽度
        $height=20;   //验证码高度
        $code=' ';
        //生成验证码
        for($i=0;$i<$num;$i++)
        {
            switch(rand(0,2))
            {
                //数字
            case 0:
                $code[$i]=chr(rand(48,57));
                break;
                //大写字母
            case 1:
                $code[$i]=chr(rand(65,90));
                break;
                //小写字母
            case 2:
                $code[$i]=chr(rand(97,122));
                break;
            }
        }
        $_SESSION["SecurityCode"]=$code;
        $image=imagecreate($width,$height);
        imagecolorallocate($image,255,255,255);
        //生成干扰像素
        for($i=0;$i<80;$i++)
        {
            $dis_color=imagecolorallocate($image,rand(0,255),rand(0,255),rand(0,255));
            imagesetpixel($image,rand(1,$width),rand(1,$height),$dis_color);
        }
        //打印字符到图像
        for($i=0;$i<$num;$i++)
        {
            $char_color=imagecolorallocate($image,rand(0,255),rand(0,255),rand(0,255));
            imagechar($image,60,($width/$num)*$i,rand(0,5),$code[$i],$char_color);
        }
        header("Content-type:image/png");
        imagepng($image);
        imagedestroy($image);
    }
}
