<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>404 Not Found</title>
        <style type="text/css">
        body,ul,li {
            margin: 0px;
        }
        ul,li {
            padding: 0px;
        }

        .welcome_box {
            margin: 30px auto;
            width: 500px;
            background: #2894FF;
            border-radius: 10px;
            box-shadow: 5px 5px 5px grey;
            background:-moz-linear-gradient(top, #F75000, #73BF00);
            background:-webkit-gradient(linear,0 0,0 bottom,from(#F75000),to(#73BF00));
            filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#F75000,endcolorstr=#73BF00,gradientType=1);
            -ms-filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#F75000,endcolorstr=#73BF00,gradientType=1);
        }
        .welcome_box h1 {
            margin: 0;
            padding: 5px 20px;
            border-bottom: 1px solid #E0E0E0;
            color: #D1E9E9;
        }
        .welcome_box ul {
            padding: 20px;
            line-height: 30px;
            color: white;
        }
        .welcome_box ul li {
            margin-left: 20px;
        }
        </style>
    </head>
    <body>
        <div class="welcome_box">
            <h1>PFW</h1>
            <ul>
                Oops，页面没有找到喔，你确定你访问的地址正确？
            </ul>
        </div>
    </body>
</html>
<?php
exit(0);
