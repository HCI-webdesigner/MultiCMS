<?php /* Smarty version Smarty-3.1.18, created on 2014-04-29 07:52:16
         compiled from "D:\wamp\www\MultiCMS\Views\templates\index.html" */ ?>
<?php /*%%SmartyHeaderCode:24403535f5a309c51b7-68458273%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'dfc951561d631652d509ba12e4706c17eb3488ca' => 
    array (
      0 => 'D:\\wamp\\www\\MultiCMS\\Views\\templates\\index.html',
      1 => 1398655754,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '24403535f5a309c51b7-68458273',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_535f5a30bad960_14982462',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535f5a30bad960_14982462')) {function content_535f5a30bad960_14982462($_smarty_tpl) {?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>登录</title>
    <link rel="stylesheet" href="../../public/stylesheets/font.css" />
    <link rel="stylesheet" href="../../public/stylesheets/index.css" />
    <style>
        tbody {
            display: inline-block;
            width: 290px;
        }
        form {
            width: 350px;
            margin: 30px auto;
        }
    </style>
</head>
<body>
<!-- <div class="top1">
                <span>
                    <a href="#" title="注册">注册</a>
                </span>
</div> -->
<div class="logo">
            <span>
                <h1>MultiCMS</h1>
            </span>
</div>
<div id="login" class="login">
    <form action="index/login" method="post">

        <h2>登录</h2>
        <table>
            <tr>
                <th><label>用户名：</label></th>
                <td><input type="text" name="user"/></td>
            </tr>
            <tr>
                <th><label>密码：</label></th>
                <td><input type="password" name="password"/></td>
            </tr>
            <tr>
                <th></th>
                <td>
                    <input type="checkbox" id="autoLogin">下次自动登录</input>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="submit" name="submit" class="submit" value="确定"/>
                </td>
            </tr>
        </table>
    </form>
</div>


</body>
</html>
<?php }} ?>
