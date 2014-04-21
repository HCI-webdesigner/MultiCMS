<?php /* Smarty version Smarty-3.1.18, created on 2014-04-21 11:59:26
         compiled from "/home/c860/MyProject/PHP/MultiCMS/Views/templates/index.html" */ ?>
<?php /*%%SmartyHeaderCode:12349132465354979e45c272-75118550%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a073e361114294e44fb80d8237abd15d509f84cc' => 
    array (
      0 => '/home/c860/MyProject/PHP/MultiCMS/Views/templates/index.html',
      1 => 1398049224,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '12349132465354979e45c272-75118550',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'indexTitle' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_5354979e565eb4_39571899',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5354979e565eb4_39571899')) {function content_5354979e565eb4_39571899($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title><?php echo $_smarty_tpl->tpl_vars['indexTitle']->value;?>
</title>
        <link rel="stylesheet" href="public/stylesheets/index.css">
    </head>
    <body>
        <div class="welcome_box">
            <h1>PFW</h1>
            <ul>
                欢迎使用PFW！PFW是一个轻量级的框架，它的特点有：
                <li>实现了传统的MVC模式，让你的代码更赏心悦目</li>
                <li>基于REST的智能路由派发，让你赶上时代的潮流</li>
                <li>全新的ORM体验，让你不需要为建立数据库而烦恼</li>
            </ul>
        </div>
    </body>
</html>
<?php }} ?>
